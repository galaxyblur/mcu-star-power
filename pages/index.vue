<template>
  <b-container fluid>
    <icons />
    <tabs />

    <div class="mt-4">
      <b-nav pills>
        <b-nav-item :active="this.sort === 'powerCareer'" @click="sort = 'powerCareer'">Career Power <i class="fa fa-star" aria-hidden="true"></i></b-nav-item>
        <b-nav-item :active="this.sort === 'powerMcu'" @click="sort = 'powerMcu'">MCU Power <svg class="icon icon-avengers"><use xlink:href="#icon-avengers"></use></svg></b-nav-item>
      </b-nav>

      <b-row class="mt-3">
        <b-col sm="12" md="6" lg="4" v-for="a in actorsSorted" :key="a.id">
          <actor-card :actor="a" :actor-last-seen-el="getLastMcuFilmElForActor(a)" @select-actor="handleSelectActor" />
        </b-col>
      </b-row>
    </div>

    <actor-modal :actor="selectedActor" :actor-mcu-list="getMcuListForActor(selectedActor)" @unselect-actor="handleUnselectActor" />
  </b-container>
</template>

<script>
import {
  map,
  sortBy,
  uniq,
} from 'lodash';

import ActorCard from '../components/ActorCard';
import ActorModal from '../components/ActorModal';
import Icons from '../components/Icons';
import Tabs from '../components/Tabs';

export default {
  components: {
    ActorCard,
    ActorModal,
    Icons,
    Tabs,
  },
  async asyncData({ app }) {
    const aggregate = await app.$axios.get('json/aggregate.json');
    const affLinks = await app.$axios.get('json/aff-links.json');

    return {
      actors: aggregate.data,
      aff: affLinks.data,
    };
  },
  data() {
    return {
      actors: [],
      aff: [],
      selectedActor: undefined,
      sort: 'powerCareer',
    };
  },
  computed: {
    actorsSorted() {
      const actorsWithPower = this.actors.filter(a => a[this.sort] > 0);
      const actorsWithoutPower = this.actors.filter(a => a[this.sort] < 1);
      const actorsWithPowerSorted = sortBy(actorsWithPower, [this.sort]).reverse();

      return actorsWithPowerSorted.concat(actorsWithoutPower);
    },
  },
  methods: {
    getInlineElementForFilm(film) {
      const t = film.title;
      const [ link ] = this.aff.filter((l) => {
        return l.type === 'film' && l.title === film.title;
      });

      let el = `<span>${t}</span>`;

      if (link) {
        el = `<a href="${link.link}" target="_blank"><i class="fa fa-play-circle"></i> ${t}</a>`;
      }

      return el;
    },
    getMcuListForActor(actor) {
      const films = [];

      if (actor) {
        actor.filmsMcu.forEach((f) => {
          films.push(this.getInlineElementForFilm(f));
        });
      }

      return films.join(' &middot; ');
    },
    getLastMcuFilmElForActor(actor) {
      const releasedFilms = actor.filmsMcu.filter(f => f.isReleased === true);
      const film = releasedFilms[releasedFilms.length - 1];
      let el;

      if (film) {
        el = this.getInlineElementForFilm(film);
      }

      return el;
    },
    handleSelectActor(actor) {
      this.selectedActor = actor;
    },
    handleUnselectActor() {
      this.selectedActor = undefined;
    }
  },
};
</script>

<style>
.icon {
  width: 24px;
  height: 24px;
  fill: #eee;
}

.nav .nav-link .icon {
  vertical-align: middle;
}

.nav .nav-link:not(.active) .icon {
  fill: violet;
}
</style>
