<template>
  <div class="uk-container uk-container-expand">

    <section class="uk-section">

      <tabs />

      <div>
        <div class="uk-flex uk-flex-wrap uk-child-width-1-5@xl uk-child-width-1-4@l uk-child-width-1-3@m uk-child-width-1-2@s">
          <div v-for="(f, fi) in filmsInCommon" :key="fi" class="uk-padding-small">
            <div class="uk-card uk-card-default uk-height-1-1 uk-box-shadow-large">
              <div class="uk-card-header uk-text-center">
                <h4 class="uk-card-title">{{ f.title }} ({{ f.year }})</h4>
              </div>
              <div class="uk-card-body uk-text-center">
                {{ f.actors.join(', ') }}
              </div>
              <div class="uk-card-footer uk-text-center">
                <a :href="'https://www.imdb.com/find?ref_=nv_sr_fn&s=all&q=' + f.title">Search IMDB</a>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>

  </div>
</template>

<script>
import Tabs from '../components/Tabs';

export default {
  head () {
    return {
      title: 'Team-Ups of the Stars of Avengers: Infinity War and the Marvel Cinematic Universe | MCU Power',
      meta: [
        { hid: 'description', name: 'description', content: 'Films and TV shows starring multiple actors from the Marvel Cinematic Universe and Avengers: Infinity War!' },
      ]
    }
  },
  components: {
    Tabs,
  },
  async asyncData({ app }) {
    const filmsInCommon = await app.$axios.get('json/films-in-common.json');

    return {
      filmsInCommon: filmsInCommon.data,
    };
  },
  data() {
    return {
      filmsInCommon: [],
    };
  },
};
</script>

<style>
</style>
