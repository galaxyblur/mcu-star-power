<template>
  <div class="mt-4 mb-4">
    <b-row align-h="between" align-v="center">
      <b-col md="6">
        <h3 class="h4 m-2 mt-3">The Stars of</h3>
        <h1 class="m-2">Avengers: Infinity War</h1>
        <h2 class="m-2">and the Marvel Cinematic Universe</h2>
      </b-col>
      <b-col md="5">
        <app-nav-affiliate-card />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import AppNavAffiliateCard from '../components/AppNavAffiliateCard';

export default {
  components: {
    AppNavAffiliateCard,
  },
};
</script>
