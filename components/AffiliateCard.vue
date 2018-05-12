<template>
  <a :href="getURLForAmazonLink(affiliateItem.asin)" target="_blank" rel="noopener nofollow">
    <b-card :title="affiliateItem.title"
        title-tag="h6"
        :img-src="getImageSourceForAmazonLink(affiliateItem.asin)"
        :img-alt="'Check out ' + affiliateItem.title"
        img-top
        tag="article"
        bg-variant="dark"
        class="affiliate-card text-center">
      <p class="card-text text-center">
        <b-button :href="getURLForAmazonLink(affiliateItem.asin)" variant="primary" target="_blank" rel="noopener nofollow">Get it!</b-button>
      </p>
    </b-card>
  </a>
</template>

<script>
import {
  getImageSourceForAmazonLink,
  getURLForAmazonLink,
} from '../lib/AffiliateLinksHelper';

export default {
  props: ['affiliate-item'],
  methods: {
    getImageSourceForAmazonLink,
    getURLForAmazonLink,
  },
};
</script>

<style>
.affiliate-card {
  cursor: pointer;
}

.affiliate-card .btn-primary {
  background-color: #F0C668;
  color: #222;
}
</style>
