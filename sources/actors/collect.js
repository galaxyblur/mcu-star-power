import vo from 'vo';

import {
  loadImdbFilmsFromFile,
  writeActorsToFile,
  getCharacterListForActor,
} from '../../lib/ActorsHelper';

import {
  remove,
  uniqueId,
} from 'lodash';

const alwaysIncludeActors = [ 'Stan Lee' ];

const loadData = async () => {
  const films = await loadImdbFilmsFromFile();

  return {
    films,
  };
};

loadData().catch(console.error).then((allData) => {
  const actors = [];

  allData.films.forEach((film) => {
    film.cast.forEach((actor, i) => {
      const [existing] = actors.filter(a => a.actorName === actor.actorName);
      const castPosition = i + 1;
      const filmInfo = {
        title: film.title,
        characterName: actor.characterName,
      };

      if (existing) {
        existing.filmsMcu.push(filmInfo);
        existing.castPositionTotal += castPosition;
        existing.castPositionAverage = Math.round(existing.castPositionTotal / existing.filmsMcu.length);
      } else {
        actors.push(Object.assign({}, {
          id: uniqueId('actor-'),
          actorName: actor.actorName,
          castPositionTotal : castPosition,
          castPositionAverage: castPosition,
          filmsMcu: [ filmInfo ],
        }));
      }
    });
  });

  remove(actors, (actor) => {
    if (alwaysIncludeActors.indexOf(actor.actorName) >= 0) {
      return false;
    }

    let rmv = false;
    const thresholds = [
      [ 1, 10 ],
      [ 2, 15 ],
      [ allData.films.length, 20 ],
    ];

    thresholds.forEach((t) => {
      if (!rmv) {
        const [ numFilms, avgPos ] = t;
        rmv = actor.filmsMcu.length <= numFilms && actor.castPositionAverage > avgPos;
      }
    });

    return rmv;
  });

  actors.forEach((actor) => {
    const characters = getCharacterListForActor(actor);
    console.log(`${actor.actorName} (${characters}) is in ${actor.filmsMcu.length} MCU films and has an average cast position of ${actor.castPositionAverage}.`);
  });
  console.log(`Kept ${actors.length} actors.`);

  // console.log(JSON.stringify(actors, null, 2));
  writeActorsToFile(actors);
});
