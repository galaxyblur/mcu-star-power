import _ from 'lodash';
import fs from 'fs';
import path from 'path';

import {
  map,
  trim,
  uniq,
} from 'lodash';

const actorsFilename = 'actors.json';
const actorsFilePath = path.resolve(__dirname, '../static/json/' + actorsFilename);

let actors = [];

const actorsMetaFilename = 'actors-meta.json';
const actorsMetaFilePath = path.resolve(__dirname, '../static/json/' + actorsMetaFilename);

let actorsMeta = [];

const oscarsFilename = 'oscars.json';
const oscarsFilePath = path.resolve(__dirname, '../static/json/' + oscarsFilename);

let oscars = [];

const globesFilename = 'globes.json';
const globesFilePath = path.resolve(__dirname, '../static/json/' + globesFilename);

let globes = [];

const baftasFilename = 'baftas.json';
const baftasFilePath = path.resolve(__dirname, '../static/json/' + baftasFilename);

let baftas = [];

const emmysFilename = 'emmys.json';
const emmysFilePath = path.resolve(__dirname, '../static/json/' + emmysFilename);

let emmys = [];

const imdbFilename = 'imdb.json';
const imdbFilePath = path.resolve(__dirname, '../static/json/' + imdbFilename);

let imdb = [];

const imdbFilmsFilename = 'imdb-films.json';
const imdbFilmsFilePath = path.resolve(__dirname, '../static/json/' + imdbFilmsFilename);

let imdbFilms = [];

const aggregateFilename = 'aggregate.json';
const aggregateFilePath = path.resolve(__dirname, '../static/json/' + aggregateFilename);

let aggregate = [];

const mcuFilmsFilename = 'mcu-films.json';
const mcuFilmsFilePath = path.resolve(__dirname, '../static/json/' + mcuFilmsFilename);

let mcuFilms = [];

export const loadActorsFromFile = () => {
  return new Promise((res, rej) => {
    fs.exists(actorsFilePath, (exists) => {
      if (exists) {
        fs.readFile(actorsFilePath, 'utf8', (err, data) => {
          if (err) {
            rej(err);
            return;
          }

          actors = JSON.parse(data);
          res(actors);
        });
      } else {
        res(actors);
      }
    });
  });
};

export const writeActorsToFile = (actorsToWrite) => {
  return new Promise((res, rej) => {
    fs.writeFile(actorsFilePath, JSON.stringify(actorsToWrite, null, 2), 'utf8', (err) => {
      if (err) {
        console.log(err.message);
        rej(err);
        return;
      }

      actors = actorsToWrite;
      res();
    });
  });
};

export const loadActorsMetaFromFile = () => {
  return new Promise((res, rej) => {
    fs.exists(actorsMetaFilePath, (exists) => {
      if (exists) {
        fs.readFile(actorsMetaFilePath, 'utf8', (err, data) => {
          if (err) {
            rej(err);
            return;
          }

          actorsMeta = JSON.parse(data);
          res(actorsMeta);
        });
      } else {
        res(actorsMeta);
      }
    });
  });
};

export const loadOscarsFromFile = () => {
  return new Promise((res, rej) => {
    fs.exists(oscarsFilePath, (exists) => {
      if (exists) {
        fs.readFile(oscarsFilePath, 'utf8', (err, data) => {
          if (err) {
            rej(err);
            return;
          }

          oscars = JSON.parse(data);
          res(oscars);
        });
      } else {
        res(oscars);
      }
    });
  });
};

export const writeOscarsToFile = (oscarsToWrite) => {
  return new Promise((res, rej) => {
    fs.writeFile(oscarsFilePath, JSON.stringify(oscarsToWrite, null, 2), 'utf8', (err) => {
      if (err) {
        console.log(err.message);
        rej(err);
        return;
      }

      oscars = oscarsToWrite;
      res();
    });
  });
};

export const loadGlobesFromFile = () => {
  return new Promise((res, rej) => {
    fs.exists(globesFilePath, (exists) => {
      if (exists) {
        fs.readFile(globesFilePath, 'utf8', (err, data) => {
          if (err) {
            rej(err);
            return;
          }

          globes = JSON.parse(data);
          res(globes);
        });
      } else {
        res(globes);
      }
    });
  });
};

export const writeGlobesToFile = (globesToWrite) => {
  return new Promise((res, rej) => {
    fs.writeFile(globesFilePath, JSON.stringify(globesToWrite, null, 2), 'utf8', (err) => {
      if (err) {
        console.log(err.message);
        rej(err);
        return;
      }

      globes = globesToWrite;
      res();
    });
  });
};

export const loadBaftasFromFile = () => {
  return new Promise((res, rej) => {
    fs.exists(baftasFilePath, (exists) => {
      if (exists) {
        fs.readFile(baftasFilePath, 'utf8', (err, data) => {
          if (err) {
            rej(err);
            return;
          }

          baftas = JSON.parse(data);
          res(baftas);
        });
      } else {
        res(baftas);
      }
    });
  });
};

export const writeBaftasToFile = (baftasToWrite) => {
  return new Promise((res, rej) => {
    fs.writeFile(baftasFilePath, JSON.stringify(baftasToWrite, null, 2), 'utf8', (err) => {
      if (err) {
        console.log(err.message);
        rej(err);
        return;
      }

      baftas = baftasToWrite;
      res();
    });
  });
};

export const loadEmmysFromFile = () => {
  return new Promise((res, rej) => {
    fs.exists(emmysFilePath, (exists) => {
      if (exists) {
        fs.readFile(emmysFilePath, 'utf8', (err, data) => {
          if (err) {
            rej(err);
            return;
          }

          emmys = JSON.parse(data);
          res(emmys);
        });
      } else {
        res(emmys);
      }
    });
  });
};

export const writeEmmysToFile = (emmysToWrite) => {
  return new Promise((res, rej) => {
    fs.writeFile(emmysFilePath, JSON.stringify(emmysToWrite, null, 2), 'utf8', (err) => {
      if (err) {
        console.log(err.message);
        rej(err);
        return;
      }

      emmys = emmysToWrite;
      res();
    });
  });
};

export const loadImdbFromFile = () => {
  return new Promise((res, rej) => {
    fs.exists(imdbFilePath, (exists) => {
      if (exists) {
        fs.readFile(imdbFilePath, 'utf8', (err, data) => {
          if (err) {
            rej(err);
            return;
          }

          imdb = JSON.parse(data);
          res(imdb);
        });
      } else {
        res(imdb);
      }
    });
  });
};

export const writeImdbToFile = (imdbToWrite) => {
  return new Promise((res, rej) => {
    fs.writeFile(imdbFilePath, JSON.stringify(imdbToWrite, null, 2), 'utf8', (err) => {
      if (err) {
        console.log(err.message);
        rej(err);
        return;
      }

      imdb = imdbToWrite;
      res();
    });
  });
};

export const loadImdbFilmsFromFile = () => {
  return new Promise((res, rej) => {
    fs.exists(imdbFilmsFilePath, (exists) => {
      if (exists) {
        fs.readFile(imdbFilmsFilePath, 'utf8', (err, data) => {
          if (err) {
            rej(err);
            return;
          }

          imdbFilms = JSON.parse(data);
          res(imdbFilms);
        });
      } else {
        res(imdbFilms);
      }
    });
  });
};

export const writeImdbFilmsToFile = (imdbFilmsToWrite) => {
  return new Promise((res, rej) => {
    fs.writeFile(imdbFilmsFilePath, JSON.stringify(imdbFilmsToWrite, null, 2), 'utf8', (err) => {
      if (err) {
        console.log(err.message);
        rej(err);
        return;
      }

      imdbFilms = imdbFilmsToWrite;
      res();
    });
  });
};

export const loadAggregateFromFile = () => {
  return new Promise((res, rej) => {
    fs.exists(aggregateFilePath, (exists) => {
      if (exists) {
        fs.readFile(aggregateFilePath, 'utf8', (err, data) => {
          if (err) {
            rej(err);
            return;
          }

          aggregate = JSON.parse(data);
          res(aggregate);
        });
      } else {
        res(aggregate);
      }
    });
  });
};

export const writeAggregateToFile = (aggregateToWrite) => {
  return new Promise((res, rej) => {
    fs.writeFile(aggregateFilePath, JSON.stringify(aggregateToWrite, null, 2), 'utf8', (err) => {
      if (err) {
        console.log(err.message);
        rej(err);
        return;
      }

      aggregate = aggregateToWrite;
      res();
    });
  });
};

export const loadMcuFilmsFromFile = () => {
  return new Promise((res, rej) => {
    fs.exists(mcuFilmsFilePath, (exists) => {
      if (exists) {
        fs.readFile(mcuFilmsFilePath, 'utf8', (err, data) => {
          if (err) {
            rej(err);
            return;
          }

          mcuFilms = JSON.parse(data);
          res(mcuFilms);
        });
      } else {
        res(mcuFilms);
      }
    });
  });
};

export const cleanUpName = (n) => {
  return trim(n.replace(/\((actor|actress)\)/g, '')
    .replace(/[^a-zA-Z\u00C0-\u02AB\."'´`-\s]/g, '')
    .replace('\n', '')
    .replace('TV', ''));
};

export const getCharacterListForActor = (actor) => {
  return uniq(map(actor.filmsMcu, 'characterName')).join(', ');
};
