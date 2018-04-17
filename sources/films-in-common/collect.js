import {
  loadAggregateFromFile,
  loadImdbFromFile,
  loadMcuFilmsFromFile,
  writeFilmsInCommonToFile,
} from '../../lib/ActorsHelper';

import {
  remove,
  sortBy,
} from 'lodash';

const alwaysRemove = [
  'Disneyland Resort: Guardians of the Galaxy - Mission Breakout!',
  'Spider-Man: Homecoming, NBA Finals: Watch the Game',
];

const loadData = async () => {
  const aggregate = await loadAggregateFromFile();
  const imdb = await loadImdbFromFile();
  const mcuFilms = await loadMcuFilmsFromFile();

  return {
    aggregate,
    imdb,
    mcuFilms,
  };
};

loadData().catch(console.error).then((allData) => {
  const filmsInCommonData = [];

  allData.imdb.forEach((actor) => {
    actor.films.forEach((film) => {
      const mcuFilm = allData.mcuFilms.filter(f => f.title === film.title);

      if (mcuFilm && mcuFilm.length > 0) {
        return;
      }

      const [ actorAgg ] = allData.aggregate.filter(a => a.actorName === actor.actorName);

      let [ el ] = filmsInCommonData.filter((f) => {
        return f.title === film.title && f.year === film.year;
      });

      if (!el) {
        el = {
          title: film.title,
          year: film.year,
          actors: [],
          actorsCount: 0,
          actorsPowerCareerTotal: 0,
          actorsPowerCareerAverage: 0,
          actorsPowerMcuTotal: 0,
          actorsPowerMcuAverage: 0,
        };

        filmsInCommonData.push(el);
      }

      if (el.actors.indexOf(actor.actorName) < 0) {
        el.actors.push(actor.actorName);
        el.actorsCount += 1;
        el.actorsPowerCareerTotal += actorAgg.powerCareer;
        el.actorsPowerCareerAverage = Math.round(el.actorsPowerCareerTotal / el.actors.length);
        el.actorsPowerMcuTotal += actorAgg.powerMcu;
        el.actorsPowerMcuAverage = Math.round(el.actorsPowerMcuTotal / el.actors.length);
      }
    });
  });

  remove(filmsInCommonData, f => f.actors.length <= 1);
  remove(filmsInCommonData, f => alwaysRemove.indexOf(f.title) >= 0);

  const sorted = sortBy(filmsInCommonData, ['actorsCount', 'actorsPowerCareerAverage', 'actorsPowerMcuAverage']);

  sorted.reverse();

  console.log(JSON.stringify(sorted, null, 2));
  writeFilmsInCommonToFile(sorted);
});
