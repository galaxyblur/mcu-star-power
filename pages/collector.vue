<template>
  <b-container>

    <tabs />

    <b-card-group columns class="pt-3">
      <affiliate-card v-for="(a, ai) in affForCollector" :key="ai" :affiliate-item="a" />
    </b-card-group>

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
