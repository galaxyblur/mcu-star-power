<template>
  <div class="uk-container uk-container-expand">
    <div class="uk-text-center">
      <h2>Who are the biggest stars in the Marvel Cinematic Universe?</h2>
    </div>
    <section class="uk-section">
      <ul class="uk-subnav uk-subnav-pill" uk-margin>
        <li :class="{ 'uk-active': this.sort === 'powerCareer' }"><a href="#" @click.prevent="sort = 'powerCareer'">Career Power</a></li>
        <li :class="{ 'uk-active': this.sort === 'powerMcu' }"><a href="#" @click.prevent="sort = 'powerMcu'">MCU Power</a></li>
      </ul>
      <div class="uk-child-width-1-4@l uk-child-width-1-3@m uk-grid-small uk-grid-match" uk-grid>
        <div v-for="(a, ai) in actorsSorted" :key="ai" class="actor-card" :class="getCssClassesForActorIndex(ai)">
          <div class="uk-card uk-card-default">
            <div class="uk-card-header">
              <div class="uk-grid-small uk-flex-middle" uk-grid>
                <div v-if="a.img" class="uk-width-auto">
                  <div><img class="uk-border-circle" width="40" height="40" :src="a.img"></div>
                  <div class="uk-badge"><i class="fa fa-star" aria-hidden="true"></i>&nbsp;{{ a.powerCareer }}</div>
                  <div class="uk-badge"><i class="fa fa-users" aria-hidden="true"></i>&nbsp;{{ a.powerMcu }}</div>
                </div>
                <div class="uk-width-expand">
                  <h3 class="uk-card-title uk-margin-remove-bottom">{{ a.actorName }}</h3>
                  <p class="uk-text-meta uk-margin-remove-top">{{ getCharacterListForActor(a) }}</p>
                </div>
              </div>
            </div>
            <div class="uk-card-body">
              <p class="actor-card-mcu-films" v-html="getMcuListForActor(a)"></p>
            </div>
            <div class="uk-card-footer">
              <div class="uk-child-width-1-4 uk-grid-small uk-grid-match" uk-grid>
                <div><i class="fa fa-trophy"></i> {{ getWinsForActor('OSCARS', a).length }}/{{ getNomsForActor('OSCARS', a).length }}</div>
                <div><i class="fa fa-trophy"></i> {{ getWinsForActor('EMMYS', a).length }}/{{ getNomsForActor('EMMYS', a).length }}</div>
                <div><i class="fa fa-trophy"></i> {{ getWinsForActor('GOLDEN_GLOBES', a).length }}/{{ getNomsForActor('GOLDEN_GLOBES', a).length }}</div>
                <div><i class="fa fa-trophy"></i> {{ getWinsForActor('BAFTAS', a).length }}/{{ getNomsForActor('BAFTAS', a).length }}</div>
                <div><i class="fa fa-film"></i> {{ a.filmsCount }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {
  map,
  sortBy,
  uniq,
} from 'lodash';

export default {
  async asyncData({ app }) {
    let { data } = await app.$axios.get('json/aggregate.json');

    return {
      actors: data,
    };
  },
  data() {
    return {
      actors: [],
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
    getCssClassesForActorIndex(i) {
      return {};
      /*
      return {
        'uk-width-1-1': i === 0,
        'uk-width-1-2': i > 0 && i <= 2,
        'uk-width-1-3': i > 2 && i <= 5,
      };
      */
    },
    getMcuListForActor(actor) {
      const films = [];

      actor.filmsMcu.slice(0, 3).forEach((f) => {
        films.push(`<span>${f.title}</span>`);
      });

      if (films.length < actor.filmsMcu.length) {
        films.push(`<span>${actor.filmsMcu.length - films.length} more&hellip;</span>`);
      }

      return films.join(', ');
    },
    getCharacterListForActor(actor) {
      return uniq(map(actor.filmsMcu, 'characterName')).join(', ');
    },
    getNomsForActor(event, actor) {
      return actor.awards.filter(aw => aw.event === event);
    },
    getWinsForActor(event, actor) {
      return actor.awards.filter(aw => (aw.event === event && aw.winner === true));
    },
  },
};
</script>

<style>
.actor-card-mcu-films > span {
  font-size: 14px;
  font-style: italic;
}
</style>
