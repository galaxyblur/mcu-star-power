<template>
  <div class="uk-container uk-container-expand">

    <icons />

    <section class="uk-section">

      <h2 class="uk-h4 uk-float-right uk-margin-top">
        The biggest stars in the Marvel Cinematic Universe
      </h2>

      <ul class="uk-subnav uk-subnav-pill" uk-margin>
        <li :class="{ 'uk-active': this.sort === 'powerCareer' }"><a href="#" @click.prevent="sort = 'powerCareer'">Career Power <i class="fa fa-star" aria-hidden="true"></i></a></li>
        <li :class="{ 'uk-active': this.sort === 'powerMcu' }"><a href="#" @click.prevent="sort = 'powerMcu'">MCU Power <svg class="icon icon-avengers"><use xlink:href="#icon-avengers"></use></svg></a></li>
      </ul>

      <div class="uk-flex uk-flex-wrap uk-child-width-1-5@xl uk-child-width-1-4@l uk-child-width-1-3@m uk-child-width-1-2@s">
        <actor-card v-for="(a, ai) in actorsSorted" :key="ai" :actor="a" :actor-last-seen-el="getLastMcuFilmElForActor(a)" @select-actor="handleSelectActor" />
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

export default {
  components: {
    ActorCard,
    ActorModal,
    Icons,
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
      const [ link ] = this.aff.filter(l => l.filmTitle === film.title);
      let el = `<span>${t}</span>`;

      if (link) {
        const l = link.affiliateLink;
        el = `<a href="${l}" target="_blank"><i class="fa fa-play-circle"></i> ${t}</a>`;
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
