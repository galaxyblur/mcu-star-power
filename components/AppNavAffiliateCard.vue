<template>
  <b-card id="app-nav-affiliate-card">
    <b-media right-align vertical-align="center">
      <b-img id="app-nav-affiliate-card-img" slot="aside" :alt="affiliateLinkFeatured.title" :src="getImageSourceForAmazonLink(affiliateLinkFeatured.asin)" />
      <h6 class="mt-0 text-right">{{ affiliateLinkFeatured.title }}</h6>
      <p class="text-right">
        <b-button :href="getURLForAmazonLink(affiliateLinkFeatured.asin)" variant="primary" target="_blank" rel="noopener nofollow">Get it!</b-button>
      </p>
    </b-media>
  </b-card>
</template>

<script>
import {
  affiliateLinks,
  getImageSourceForAmazonLink,
  getURLForAmazonLink,
} from '../lib/AffiliateLinksHelper';

export default {
  data() {
    return {
      affiliateLinkFeatured: affiliateLinks.filter(l => l.asin === 'B071WT4KLM')[0],
    };
  },
  methods: {
    getImageSourceForAmazonLink,
    getURLForAmazonLink,
  },
};
</script>

<style>
#app-nav-affiliate-card .btn-primary {
  background-color: #F0C668;
  color: #222;
}

#app-nav-affiliate-card-img {
  max-width: 100px;
  max-height: 100px;
}
</style>
