<template>
  <b-container fluid>

    <tabs />

    <div>
      <b-table small :items="filmsInCommon" :fields="fields" thead-class="team-ups-thead">
        <template slot="link" slot-scope="data">
          <a :href="data.item.link" target="_blank" rel="noopener">Search IMDB</a>
        </template>
      </b-table>
    </div>

  </b-container>
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

    if (filmsInCommon.data && filmsInCommon.data.length > 0) {
      filmsInCommon.data.forEach((f) => {
        f.actorsCount = f.actors.length;
        f.link = `https://www.imdb.com/find?ref_=nv_sr_fn&s=all&q=${f.title}`;
      });
    }

    return {
      filmsInCommon: filmsInCommon.data,
    };
  },
  data() {
    return {
      filmsInCommon: [],
      fields: [
        {
          key: 'title',
          label: 'Title',
          sortable: true,
        },
        {
          key: 'actorsCount',
          label: 'MCU Actors',
          sortable: true,
        },
        {
          key: 'actors',
          label: 'MCU Actor Names',
          sortable: false,
          formatter(val) {
            return val.join(', ');
          },
        },
        {
          key: 'actorsPowerCareerAverage',
          label: 'Average Career Power',
          sortable: true,
        },
        {
          key: 'actorsPowerMcuAverage',
          label: 'Average MCU Power',
          sortable: true,
        },
        {
          key: 'link',
          label: 'Link',
          sortable: false,
        },
      ],
    };
  },
};
</script>

<style>
.team-ups-thead th {
  border-top-width: 0;
}
</style>
