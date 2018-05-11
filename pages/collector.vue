<template>
  <b-container fluid>

    <tabs />

    <b-row>
      <b-col sm="6" md="4" lg="3" v-for="(a, ai) in affForCollector" :key="ai">
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
      title: 'Collect the Essentials of Avengers: Infinity War and the Marvel Cinematic Universe | MCU Power',
      meta: [
        { hid: 'description', name: 'description', content: 'Collect the essential films and more in the Marvel Cinematic Universe, including Avengers: Infinity War!' },
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
    affForCollector() {
      const rev = Array.from(this.aff);
      return rev.filter((a) => {
        return a.type === 'film';
      }).reverse();
    },
  },
};
</script>

<style>
</style>
