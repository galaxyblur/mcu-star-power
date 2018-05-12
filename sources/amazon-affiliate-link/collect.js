import vo from 'vo';
import Nightmare from 'nightmare';

import {
  loadAffLinksFromFile,
  writeAffLinksToFile,
} from '../../lib/AffiliateLinksFileHelper';

const collect = async () => {
  const url = process.argv[2];

  if (!url) {
    console.warn('No URL provided.');
    return;
  }

  const asin = url.match(/.*\/\/www.amazon.com\/.*dp\/([A-Z0-9]*)\//)[1];

  if (asin) {
    console.log(`Found ASIN ${asin}`);
  } else {
    console.warn('Could not find ASIN!');
    return;
  }

  const allAffLinks = await loadAffLinksFromFile();

  if (!allAffLinks) {
    console.warn('No affiliate links!');
    return;
  }

  if (allAffLinks.filter(a => a.asin === asin).length > 0) {
    console.warn(`A link with ASIN ${asin} already exists!`);
  }

  const info = {
    asin,
  };

  const run = function * () {
    const nightmare = Nightmare({
      show: false,
      dock: true,
      typeInterval: 20,
      waitTimeout: 10000,
      openDevTools: true,
      webPreferences: { images: false },
    });

    const affTitle = yield nightmare.goto(url)
      .wait('#productTitle')
      .evaluate(() => {
        const titleEl = document.querySelector('#productTitle');

        return titleEl ? titleEl.innerText : '';
      });

    if (affTitle) {
      console.log(`Found title for ${asin}: ${affTitle}`);
    } else {
      console.warn(`Could not find a title for product ${asin}!`);
      return allAffLinks;
    }

    info.title = affTitle;

    nightmare.end()
      .catch((error) => {
        console.error('Search failed:', error);
      })
      .then();

    allAffLinks.push(info);

    return allAffLinks;
  }

  vo(run)((err, links) => {
    // console.log(JSON.stringify(links, null, 2));
    writeAffLinksToFile(links);
  });
};

collect();
