import vo from 'vo';
import Nightmare from 'nightmare';

import {
  loadActorsFromFile,
  loadEmmysFromFile,
  writeEmmysToFile,
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

  loadEmmysFromFile().catch(console.error).then((allAwards) => {
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

        const actorAwards = yield nightmare.goto(`http://www.emmys.com/awards/nominations/award-search?search_api_views_fulltext=${escape(a.actorName)}&submit=Search&field_celebrity_details_field_display_name=&field_show_details_field_nominee_show_nr_title=&field_show_details_field_network=All&field_show_details_field_production_company=All&field_nominations_year=1949-01-01+00%3A00%3A00&field_nominations_year_1=2018-01-01+00%3A00%3A00&field_award_category=All`)
          .wait('#page')
          .evaluate(() => {
            const awards = [];
            document.querySelectorAll('#page .view-content .views-row .item .wrap').forEach((row) => {
              const award = {};

              const cat = row.querySelector('h3').innerText;
              const catSplit = cat.split(' - ');

              award.category = catSplit[0];
              award.year = catSplit[1];
              award.title = row.querySelector(':scope > ul:not(.winner-list) > li:not(.nominee) a').innerText;
              award.winner = row.querySelector(':scope > ul.winner') ? true : false;
              awards.push(award);
            });

            return awards;
          });

        if (actorAwards && actorAwards.length > 0) {
          awardsObj.awards = actorAwards;
          awardsObj.power += actorAwards.length;
          awardsObj.power += actorAwards.filter(a => a.winner === true).length;
          awardsObj.power += actorAwards.filter(a => a.category.toLowerCase().indexOf('supporting') === -1).length;
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
      writeEmmysToFile(awards);
    });
  });
});
