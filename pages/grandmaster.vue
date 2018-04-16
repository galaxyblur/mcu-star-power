<template>
  <div class="uk-container uk-container-expand">

    <section class="uk-section">

      <tabs />

      <div>
        <div class="uk-flex uk-flex-wrap uk-child-width-1-5@xl uk-child-width-1-4@l uk-child-width-1-3@m uk-child-width-1-2@s">
          <affiliate-card v-for="(a, ai) in affForGrandmaster" :key="ai" :affiliate-item="a" />
        </div>
      </div>

    </section>

  </div>
</template>

<script>
import AffiliateCard from '../components/AffiliateCard';
import Tabs from '../components/Tabs';

export default {
  components: {
    AffiliateCard,
    Tabs,
  },
  async asyncData({ app }) {
    const affLinks = await app.$axios.get('json/aff-links.json');

    return {
      aff: affLinks.data,
    };
  },
  data() {
    return {
      aff: [],
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
