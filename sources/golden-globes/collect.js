import vo from 'vo';
import Nightmare from 'nightmare';

import {
  loadActorsFromFile,
  loadGlobesFromFile,
  writeGlobesToFile,
  getCharacterListForActor,
} from '../../lib/ActorsHelper';

import {
  isEqual,
  kebabCase,
  uniqWith,
} from 'lodash';

loadActorsFromFile().catch(console.error).then((allActors) => {
  if (!allActors) {
    console.warn('No actors!');
    return;
  }

  loadGlobesFromFile().catch(console.error).then((allAwards) => {
    if (!allAwards) {
      allAwards = [];
    }

    const run = function * () {
      const allActorsUnique = uniqWith(allActors, isEqual);
      const nightmare = Nightmare({
        show: true,
        dock: true,
        typeInterval: 20,
        waitTimeout: 5000,
        openDevTools: true,
        webPreferences: { images: false },
      });
      const awards = [];
      let i;

      for (i = 0; i < allActorsUnique.length; i++) {
        const a = allActorsUnique[i];
        console.log(`${i}. ${a.actorName} as ${getCharacterListForActor(a)}`);

        if (allAwards.filter(aw => aw.actorName === a.actorName).length > 0) {
          console.log('Data exists. Skipped.');
          continue;
        }

        const awardsObj = {
          actorName: a.actorName,
          awards: [],
          power: 0,
        };

        const actorAwards = yield nightmare.goto(`https://www.goldenglobes.com/person/${kebabCase(a.actorName)}`)
          .wait('#block-system-main')
          .evaluate(() => {
            const awards = [];
            const el = document.querySelectorAll('.view-display-id-person_country_song .view-content .views-row').forEach((row) => {
              const award = {};

              award.year = row.querySelector('.views-field-field-nomination-year .date-display-single').innerText;
              award.winner = row.querySelector('.views-field-field-nomination-is-winner > div').innerText === 'Winner' ? true : false;
              award.title = row.querySelector('.views-field-nominee-title a').innerText;
              award.category = row.querySelector('.views-field-field-nomination-category a').innerText;
              awards.push(award);
            });

            return awards;
          });

        if (actorAwards && actorAwards.length > 0) {
          awardsObj.awards = actorAwards;
          awardsObj.power += actorAwards.length;
          awardsObj.power += actorAwards.filter(a => a.winner === true).length;
          awardsObj.power += actorAwards.filter(a => a.category.indexOf('SUPPORTING') === -1).length;
        }

        console.log(`${actorAwards.length} awards for power ${awardsObj.power}`);
        allAwards.push(awardsObj);
      }

      nightmare.end()
        .catch((error) => {
          console.error('Search failed:', error);
        })
        .then();

      return allAwards;
    };

    vo(run)((err, awards) => {
      console.log(JSON.stringify(awards, null, 2));
      writeGlobesToFile(awards);
    });
  });
});
