import vo from 'vo';
import Nightmare from 'nightmare';

import {
  loadActorsFromFile,
  loadOscarsFromFile,
  writeOscarsToFile,
} from '../lib/ActorsHelper';

import {
  isEqual,
  uniqWith,
} from 'lodash';

loadActorsFromFile().catch(console.error).then((allActors) => {
  if (!allActors) {
    console.warn('No actors!');
    return;
  }

  loadOscarsFromFile().catch(console.error).then((allAwards) => {
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

        const actorAwards = yield nightmare.goto('http://awardsdatabase.oscars.org/')
          .wait('#BasicSearchView_Nominee')
          .type('#BasicSearchView_Nominee', a.actorName)
          .click('#btnbasicsearch')
          .wait('#resultscontainer')
          .evaluate(() => {
            const awards = [];
            const el = document.querySelectorAll('.result-subgroup .row').forEach((row) => {
              const award = {};
              const character = row.querySelector('.col-lg-10 .awards-result-character div');

              if (character) {
                award.character = character.innerText;
                award.year = row.querySelector('.col-lg-2 .result-subgroup-title a').innerText;
                award.title = row.querySelector('.col-lg-10 .awards-result-film-title a').innerText;
                award.category = row.querySelector('.col-lg-10 .awards-result-awardcategory-exact a').innerText;
                award.winner = row.querySelector('.col-lg-10 .glyphicon-star') ? true : false;
                awards.push(award);
              }
            });

            return awards;
          });

        if (actorAwards && actorAwards.length > 0) {
          awardsObj.awards = actorAwards;
          awardsObj.power += actorAwards.length;
          awardsObj.power += actorAwards.filter(a => a.winner === true).length;
          awardsObj.power += actorAwards.filter(a => a.category.indexOf('LEADING') >= 0).length;
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
      writeOscarsToFile(awards);
    });
  });
});
