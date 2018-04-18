<template>
  <div class="uk-container uk-container-expand">

    <section class="uk-section">

      <tabs />

      <div>
        <table class="uk-table uk-table-small uk-table-divider">
          <thead>
            <tr>
              <th>Title</th>
              <th>MCU Actors</th>
              <th>Average Career Power</th>
              <th>Average MCU Power</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(f, fi) in filmsInCommon" :key="fi">
              <td>{{ f.title }} ({{ f.year }})</td>
              <td>({{ f.actors.length }}) {{ f.actors.join(', ') }}</td>
              <td>{{ f.actorsPowerCareerAverage }}</td>
              <td>{{ f.actorsPowerMcuAverage }}</td>
              <td>
                <a :href="'https://www.imdb.com/find?ref_=nv_sr_fn&s=all&q=' + f.title" target="_blank">Search IMDB</a>
              </td>
            </tr>
          </tbody>
        </table>
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
