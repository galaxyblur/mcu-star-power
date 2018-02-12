import vo from 'vo';
import Nightmare from 'nightmare';

import {
  loadActorsFromFile,
  loadBaftasFromFile,
  writeBaftasToFile,
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

  loadBaftasFromFile().catch(console.error).then((allAwards) => {
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
      });
      const awards = [];
      let i;

      for (i = 0; i < allActorsUnique.length; i++) {
        const a = allActorsUnique[i];
        console.log(`${i}. ${a.actorName} as ${a.characterName}`);

        if (allAwards.filter(aw => aw.actorName === a.actorName).length > 0) {
          console.log('Data exists. Skipped.');
          continue;
        }

        const awardsObj = {
          actorName: a.actorName,
          awards: [],
          power: 0,
        };

        const actorAwards = yield nightmare.goto(`http://awards.bafta.org/keyword-search?keywords=${escape(a.actorName)}`)
          .wait('#block-system-main')
          .evaluate(() => {
            const awards = [];
            document.querySelectorAll('#block-system-main .view-content ul > li').forEach((row) => {
              const award = {};

              const cat = row.querySelector('.search-result-title a').innerText;
              const catSplit = cat.split(/ in ([0-9]+)/);

              award.category = catSplit[0];
              award.year = catSplit[1];
              award.title = row.querySelector('.search-result-nomination .search-result-subtitle p').innerText;
              award.winner = row.querySelector('.search-result-headline.search-result-winner') ? true : false;
              awards.push(award);
            });

            return awards;
          });

        if (actorAwards && actorAwards.length > 0) {
          awardsObj.awards = actorAwards;
          awardsObj.power += actorAwards.length;
          awardsObj.power += actorAwards.filter(a => a.winner === true).length;
          awardsObj.power += actorAwards.filter(a => a.category.indexOf('Supporting') === -1).length;
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
      writeBaftasToFile(awards);
    });
  });
});
