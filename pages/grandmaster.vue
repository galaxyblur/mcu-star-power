<template>
  <b-container fluid>

    <tabs />

    <b-row>
      <b-col sm="6" md="4" lg="3" v-for="(a, ai) in affForGrandmaster" :key="ai">
        <affiliate-card :affiliate-item="a" />
      </b-col>
    </b-row>

  </b-container>
</template>

<script>
import AffiliateCard from '../components/AffiliateCard';
import Tabs from '../components/Tabs';

import {
  affiliateLinks,
} from '../lib/AffiliateLinksHelper';

export default {
  head () {
    return {
      title: 'Be a Grandmaster of Avengers: Infinity War and the Marvel Cinematic Universe | MCU Power',
      meta: [
        { hid: 'description', name: 'description', content: 'Collect Everything in the Marvel Cinematic Universe, including Avengers: Infinity War!' },
      ]
    }
  },
  components: {
    AffiliateCard,
    Tabs,
  },
  data() {
    return {
      aff: affiliateLinks,
    };
  },
  computed: {
    affForGrandmaster() {
      const rev = Array.from(this.aff);
      return rev.reverse();
    },
  },
};
</script>

<style>
</style>
