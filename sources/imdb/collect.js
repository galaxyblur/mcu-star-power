import vo from 'vo';
import Nightmare from 'nightmare';

import {
  loadActorsFromFile,
  loadMcuFilmsFromFile,
  loadImdbFromFile,
  writeImdbToFile,
} from '../../lib/ActorsHelper';

import {
  isEqual,
  uniqWith,
  intersectionWith,
  deburr,
  trim,
} from 'lodash';

const normalizeFilmTitle = (title) => {
  return trim(deburr(title.toLowerCase()));
};

const collect = async () => {
  const allActors = await loadActorsFromFile();

  if (!allActors) {
    console.warn('No actors!');
    return;
  }

  const mcuFilms = await loadMcuFilmsFromFile();

  if (!mcuFilms) {
    console.warn('No mcu films!');
    return;
  }

  let allInfo = await loadImdbFromFile();

  if (!allInfo) {
    allInfo = [];
  }

  const run = function * () {
    const allActorsUnique = uniqWith(allActors, isEqual);
    const nightmare = Nightmare({
      show: true,
      dock: true,
      typeInterval: 20,
      waitTimeout: 10000,
      openDevTools: true,
    });

    const start = 0;
    const end = allActorsUnique.length;
    let i;

    for (i = start; i < end; i++) {
      const a = allActorsUnique[i];
      console.log(`${i}. ${a.actorName} as ${a.characterName}`);

      if (allInfo.filter(info => info.actorName === a.actorName).length > 0) {
        console.log('Data exists. Skipped.');
        continue;
      }

      const actorInfo = yield nightmare.goto(`http://www.imdb.com/find?q=${a.actorName.toLowerCase()}&s=nm&exact=true&ref_=fn_nm_ex`)
        .wait('#findSubHeader')
        .click('table.findList tr.findResult td.result_text a')
        .wait('#content-2-wide')
        .evaluate(() => {
          const imgEl = document.querySelector('#name-poster');
          const info = {
            films: [],
            img: (imgEl ? imgEl.src : undefined),
          };

          const actorFilmsList = document.querySelectorAll('#filmo-head-actor + .filmo-category-section > div, #filmo-head-actress + .filmo-category-section > div');

          if (actorFilmsList && actorFilmsList.length > 0) {
            actorFilmsList.forEach((film) => {
              const fTitleEl = film.querySelector('b > a');
              const fTitle = fTitleEl ? fTitleEl.innerText : '';
              const fYearEl = film.querySelector('.year_column');
              const fYear = fYearEl ? fYearEl.innerText.replace('&nbsp;', '') : undefined;

              info.films.push({
                title: fTitle,
                year: fYear,
              });
            });
          }

          return info;
        });

      actorInfo.filmsMcu = intersectionWith(mcuFilms, actorInfo.films, (a, b) => {
        // console.log(normalizeFilmTitle(a.title), normalizeFilmTitle(b.title));
        return normalizeFilmTitle(a.title) === normalizeFilmTitle(b.title);
      });

      actorInfo.actorName = a.actorName;
      actorInfo.power = actorInfo.filmsMcu.length * 3;
      actorInfo.filmsCount = actorInfo.films.length;
      actorInfo.films = [];

      console.log(`${actorInfo.filmsMcu.length} of ${actorInfo.filmsCount} films in MCU`);
      allInfo.push(actorInfo);
    }

    nightmare.end()
      .catch((error) => {
        console.error('Search failed:', error);
      })
      .then();

    return allInfo;
  };

  vo(run)((err, infos) => {
    console.log(JSON.stringify(infos, null, 2));
    writeImdbToFile(infos);
  });
};

collect();
