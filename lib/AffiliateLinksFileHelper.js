import fs from 'fs';
import path from 'path';

const affLinksFilename = 'aff-links.json';
const affLinksFilePath = path.resolve(__dirname, '../static/json/' + affLinksFilename);

let affLinks = [];

export const writeAffLinksToFile = (affLinksToWrite) => {
  return new Promise((res, rej) => {
    fs.writeFile(affLinksFilePath, JSON.stringify(affLinksToWrite, null, 2), 'utf8', (err) => {
      if (err) {
        console.log(err.message);
        rej(err);
        return;
      }

      affLinks = affLinksToWrite;
      res();
    });
  });
};

export const loadAffLinksFromFile = () => {
  return new Promise((res, rej) => {
    fs.exists(affLinksFilePath, (exists) => {
      if (exists) {
        fs.readFile(affLinksFilePath, 'utf8', (err, data) => {
          if (err) {
            rej(err);
            return;
          }

          affLinks = JSON.parse(data);
          res(affLinks);
        });
      } else {
        res(affLinks);
      }
    });
  });
};
