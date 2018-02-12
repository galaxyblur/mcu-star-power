// import vo from 'vo';
import Nightmare from 'nightmare';

import {
  cleanUpName,
  writeActorsToFile
} from '../../lib/ActorsHelper';

import {
  isEqual,
  sortBy,
  uniqWith,
} from 'lodash';

const getActors = () => {
  const nightmare = Nightmare({ show: true, dock: true });

  return new Promise((res, rej) => {
    nightmare
      .goto('https://en.wikipedia.org/wiki/List_of_Marvel_Cinematic_Universe_film_actors')
      .evaluate((sel) => {
        const actors = [];

        document.querySelectorAll(sel).forEach((tr) => {
          const th = tr.querySelector('th:not([colspan])');

          if (th) {
            const a = th.querySelector(':scope > a');
            const sm = th.querySelector(':scope > a > small');
            const alias = sm ? sm.innerText : '';
            let charName = a ? a.innerText : th.innerText;
            charName = charName.replace(alias, '');

            if (charName) {
              tr.querySelectorAll('td').forEach((td) => {
                if (td) {
                  const a = td.querySelector(':scope > a');
                  const actorName = a ? a.innerText : $(td).clone().children().remove().end().text();

                  if (actorName) {
                    actors.push({
                      characterName: charName,
                      actorName,
                    });
                  }
                }
              });
            }
          }
        });

        return actors;
      }, '.wikitable tr:not(:first-child)')
      .end()
      .then(actors => res(actors))
      .catch((error) => {
        console.error('Search failed:', error);
        rej(error);
      });
  });
};

getActors().then((actorsList) => {
  const actorsListFinal = [];

  actorsList.forEach((a) => {
    actorsListFinal.push({
      characterName: cleanUpName(a.characterName),
      actorName: cleanUpName(a.actorName),
    });
  });

  console.log(
    sortBy(uniqWith(actorsListFinal.sort(), isEqual), ['actorName', 'characterName'])
  );

  writeActorsToFile(
    sortBy(uniqWith(actorsListFinal.sort(), isEqual), ['actorName', 'characterName'])
  );
});
