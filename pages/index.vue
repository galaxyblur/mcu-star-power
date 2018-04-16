<template>
  <div class="uk-container uk-container-expand">

    <icons />

    <section class="uk-section">

      <tabs />

      <div>
        <div class="uk-flex">
          <ul class="uk-width-auto@m uk-width-1-1@s uk-subnav uk-subnav-pill uk-margin-top">
            <li :class="{ 'uk-active': this.sort === 'powerCareer' }"><a href="#" @click.prevent="sort = 'powerCareer'">Career Power <i class="fa fa-star" aria-hidden="true"></i></a></li>
            <li :class="{ 'uk-active': this.sort === 'powerMcu' }"><a href="#" @click.prevent="sort = 'powerMcu'">MCU Power <svg class="icon icon-avengers"><use xlink:href="#icon-avengers"></use></svg></a></li>
          </ul>
        </div>

        <div class="uk-flex uk-flex-wrap uk-child-width-1-5@xl uk-child-width-1-4@l uk-child-width-1-3@m uk-child-width-1-2@s">
          <actor-card v-for="(a, ai) in actorsSorted" :key="ai" :actor="a" :actor-last-seen-el="getLastMcuFilmElForActor(a)" @select-actor="handleSelectActor" />
        </div>
      </div>

    </section>

    <actor-modal :actor="selectedActor" :actor-mcu-list="getMcuListForActor(selectedActor)" @unselect-actor="handleUnselectActor" />

  </div>
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

      return films.join(', ');
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
  fill: #ccc;
}

.uk-subnav .icon {
  fill: #ccc;
}
</style>
