import vo from 'vo';
import Nightmare from 'nightmare';

import {
  loadMcuFilmsFromFile,
  loadImdbFilmsFromFile,
  writeImdbFilmsToFile,
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
  const mcuFilms = await loadMcuFilmsFromFile();

  if (!mcuFilms) {
    console.warn('No mcu films!');
    return;
  }

  let allFilms = await loadImdbFilmsFromFile();

  if (!allFilms) {
    allFilms = [];
  }

  const run = function * () {
    const nightmare = Nightmare({
      show: true,
      dock: true,
      typeInterval: 20,
      waitTimeout: 10000,
      openDevTools: true,
      webPreferences: { images: false },
    });

    const start = 0;
    const end = mcuFilms.length;
    let i;

    for (i = start; i < end; i++) {
      const f = mcuFilms[i];
      console.log(`${i}. ${f.title}`);

      if (allFilms.filter(info => info.title === f.title).length > 0) {
        console.log('Data exists. Skipped.');
        continue;
      }

      const filmInfo = yield nightmare.goto(f.url)
        .wait('#content-2-wide')
        .evaluate(() => {
          const statusEl = document.querySelector('#titleProduction');
          const statusLine = statusEl ? statusEl.innerText : '';
          const statusMatch = statusLine.match(/Status: (.+) \|/);
          const status = statusMatch ? statusMatch[1] : undefined;

          const yearEl = document.querySelector('#titleYear > a');
          const year = yearEl ? parseInt(yearEl.innerText, 10) : undefined;

          const info = {
            cast: [],
            status: ((!status && year && year <= 2018) ? 'Released' : status),
            year: (yearEl ? yearEl.innerText : undefined),
          };

          return info;
        });

      filmInfo.title = f.title;
      console.log(filmInfo.status, filmInfo.year);

      if (filmInfo.status && filmInfo.status !== 'Announced') {
        const filmCast = yield nightmare.goto(`${f.url}fullcredits#cast`)
          // .wait('.cast_list')
          .evaluate(() => {
            const castEl = document.querySelectorAll('.cast_list tr[class]');
            const cast = [];

            if (castEl && castEl.length > 0) {
              castEl.forEach((c) => {
                const characterName = c.querySelector('td.character').innerText;

                if (characterName.indexOf('uncredited') === -1) {
                  cast.push({
                    actorName: c.querySelector('td.itemprop').innerText,
                    characterName: characterName.replace(/\n/g, ''),
                  });
                }
              });
            }

            return cast;
          });

        filmInfo.cast = filmCast;
        console.log(`${filmInfo.cast.length} cast members`);
      }

      allFilms.push(filmInfo);
    }

    nightmare.end()
      .catch((error) => {
        console.error('Search failed:', error);
      })
      .then();

    return allFilms;
  };

  vo(run)((err, infos) => {
    console.log(JSON.stringify(infos, null, 2));
    writeImdbFilmsToFile(infos);
  });
};

collect();
