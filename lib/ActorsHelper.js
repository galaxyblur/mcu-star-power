import _ from 'lodash';
import fs from 'fs';
import path from 'path';

import {
  trim,
} from 'lodash';

const actorsFilename = 'actors.json';
const actorsFilePath = path.resolve(__dirname, '../json/' + actorsFilename);

let actors = [];

const oscarsFilename = 'oscars.json';
const oscarsFilePath = path.resolve(__dirname, '../json/' + oscarsFilename);

let oscars = [];

const globesFilename = 'globes.json';
const globesFilePath = path.resolve(__dirname, '../json/' + globesFilename);

let globes = [];

const baftasFilename = 'baftas.json';
const baftasFilePath = path.resolve(__dirname, '../json/' + baftasFilename);

let baftas = [];

const aggregateFilename = 'aggregate.json';
const aggregateFilePath = path.resolve(__dirname, '../json/' + aggregateFilename);

let aggregate = [];

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

export const cleanUpName = (n) => {
  return trim(n.replace(/\((actor|actress)\)/g, '')
    .replace(/[^a-zA-Z\u00C0-\u02AB\."'´`-\s]/g, '')
    .replace('\n', '')
    .replace('TV', ''));
};
