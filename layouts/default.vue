<template>
  <b-container>
    <app-nav />
    <nuxt/>
    <app-footer />
  </b-container>
</template>

<script>
import AppFooter from '../components/AppFooter';
import AppNav from '../components/AppNav';

export default {
  components: {
    AppFooter,
    AppNav,
  },
};
</script>

<style>
.svg-inline--fa {
  width: 1em;
}
</style>
