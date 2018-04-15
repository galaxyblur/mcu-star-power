import vo from 'vo';

import {
  loadActorsFromFile,
  loadActorsMetaFromFile,
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
  const actorsMeta = await loadActorsMetaFromFile();
  const baftas = await loadBaftasFromFile();
  const oscars = await loadOscarsFromFile();
  const globes = await loadGlobesFromFile();
  const emmys = await loadEmmysFromFile();
  const imdb = await loadImdbFromFile();

  return {
    actors,
    actorsMeta,
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
    let filmsMcu = actor.filmsMcu;
    let filmsCount = 0;
    let powerCareer = 0;
    let powerMcu = filmsMcu.length;

    const [metaObj] = allData.actorsMeta.filter(a => a.actorName === actor.actorName);
    let img, characterDisplayName;

    if (metaObj) {
      img = metaObj.image ? metaObj.image : undefined;

      if (metaObj.characterName) {
        characterDisplayName = metaObj.characterName;

        if (metaObj.characterAlias) {
          characterDisplayName = `${characterDisplayName} / ${metaObj.characterAlias}`;
        }
      }
    }

    const [baftas] = allData.baftas.filter(a => a.actorName === actor.actorName);
    const [oscars] = allData.oscars.filter(a => a.actorName === actor.actorName);
    const [globes] = allData.globes.filter(a => a.actorName === actor.actorName);
    const [emmys] = allData.emmys.filter(a => a.actorName === actor.actorName);
    const [imdb] = allData.imdb.filter(a => a.actorName === actor.actorName);

    if (baftas) {
      awards = awards.concat(map(baftas.awards, a => Object.assign({ event: 'BAFTAS' }, a)));
      powerCareer += baftas.power;
    }

    if (oscars) {
      awards = awards.concat(map(oscars.awards, a => Object.assign({ event: 'OSCARS' }, a)));
      powerCareer += oscars.power;
    }

    if (globes) {
      awards = awards.concat(map(globes.awards, a => Object.assign({ event: 'GOLDEN_GLOBES' }, a)));
      powerCareer += globes.power;
    }

    if (emmys) {
      awards = awards.concat(map(emmys.awards, a => Object.assign({ event: 'EMMYS' }, a)));
      powerCareer += emmys.power;
    }

    if (imdb) {
      if (!img) {
        img = imdb.img;
      }

      filmsCount = imdb.filmsCount;
      powerCareer += imdb.power;
    }

    aggregateData.push(
      Object.assign({
        awards,
        characterDisplayName,
        img,
        filmsMcu,
        filmsCount,
        powerCareer,
        powerMcu,
      }, actor)
    );
  });

  console.log(JSON.stringify(aggregateData, null, 2));
  writeAggregateToFile(aggregateData);
});

