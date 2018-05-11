import links from '../static/json/aff-links.json';

export const campaignTag = 'mcupower-20';
export const affiliateLinks = links;

export const getURLForAmazonLink = (asin) => {
  return `http://www.amazon.com/dp/${asin}/?tag=${campaignTag}`;
};

export const getIframeForAmazonLink = (asin) => {
  const markupStart = '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="';
  const url = `//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ss&ref=as_ss_li_til&ad_type=product_link&show_border=false&link_opens_in_new_window=true&tracking_id=${campaignTag}&marketplace=amazon&region=US&placement=${asin}&asins=${asin}`;
  const markupEnd = '"></iframe>';

  return `${markupStart}${url}${markupEnd}`;
};

export const getImageSourceForAmazonLink = (asin) => {
  return `//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=${asin}&Format=_SL250_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=${campaignTag}`;
};
