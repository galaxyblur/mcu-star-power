import vo from 'vo';

import {
  loadActorsFromFile,
  loadBaftasFromFile,
  loadOscarsFromFile,
  loadGlobesFromFile,
  loadEmmysFromFile,
  loadImdbFromFile,
  writeAggregateToFile,
} from '../../lib/ActorsHelper';

import {
  map,
} from 'lodash';

const loadData = async () => {
  const actors = await loadActorsFromFile();
  const baftas = await loadBaftasFromFile();
  const oscars = await loadOscarsFromFile();
  const globes = await loadGlobesFromFile();
  const emmys = await loadEmmysFromFile();
  const imdb = await loadImdbFromFile();

  return {
    actors,
    baftas,
    oscars,
    globes,
    emmys,
    imdb,
  };
};

loadData().catch(console.error).then((allData) => {
  const aggregateData = [];

  allData.actors.forEach((actor) => {
    let awards = [];
    let img;
    let mcuFilms = [];
    let power = 0;

    const [baftas] = allData.baftas.filter(a => a.actorName === actor.actorName);
    const [oscars] = allData.oscars.filter(a => a.actorName === actor.actorName);
    const [globes] = allData.globes.filter(a => a.actorName === actor.actorName);
    const [emmys] = allData.emmys.filter(a => a.actorName === actor.actorName);
    const [imdb] = allData.imdb.filter(a => a.actorName === actor.actorName);

    if (baftas) {
      awards = awards.concat(map(baftas.awards, a => Object.assign({ event: 'BAFTAS' }, a)));
      power += baftas.power;
    }

    if (oscars) {
      awards = awards.concat(map(oscars.awards, a => Object.assign({ event: 'OSCARS' }, a)));
      power += oscars.power;
    }

    if (globes) {
      awards = awards.concat(map(globes.awards, a => Object.assign({ event: 'GOLDEN_GLOBES' }, a)));
      power += globes.power;
    }

    if (emmys) {
      awards = awards.concat(map(emmys.awards, a => Object.assign({ event: 'EMMYS' }, a)));
      power += emmys.power;
    }

    if (imdb) {
      img = imdb.img;
      mcuFilms = imdb.filmsMcu;
      power += imdb.power;
    }

    aggregateData.push(
      Object.assign({
        awards,
        img,
        mcuFilms,
        power,
      }, actor)
    );
  });

  console.log(JSON.stringify(aggregateData, null, 2));
  writeAggregateToFile(aggregateData);
});

