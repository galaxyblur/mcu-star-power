<template>
  <section class="uk-section">
    <div>
      <h1>MCU Star Power</h1>
      <h2>Who are the biggest stars in the Marvel Cinematic Universe?</h2>
    </div>
    <div class="uk-child-width-1-4@l uk-child-width-1-3@m uk-grid-small uk-grid-match" uk-grid>
      <div class="actor-card" v-for="(a, ai) in actorsSorted" :key="ai">
        <div class="uk-card uk-card-default">
          <div class="uk-card-header">
            <div class="uk-grid-small uk-flex-middle" uk-grid>
              <div v-if="a.img" class="uk-width-auto">
                <img class="uk-border-circle" width="40" height="40" :src="a.img">
              </div>
              <div class="uk-width-expand">
                <h3 class="uk-card-title uk-margin-remove-bottom">{{ a.actorName }}</h3>
                <div class="uk-badge"><span uk-icon="star"></span> {{ a.power }}</div>
              </div>
            </div>
          </div>
          <div class="uk-card-body">
            <p>as <i>"{{ a.characterName }}"</i> in {{ a.mcuFilms.length }} films</p>
            <p class="actor-card-mcu-films" v-html="getMcuFilmsListForActor(a)"></p>
            <ul class="uk-list">
              <li>{{ getWinsForActor('OSCARS', a).length }} Oscars ({{ getNomsForActor('OSCARS', a).length }} nominations)</li>
              <li>{{ getWinsForActor('EMMYS', a).length }} Emmys ({{ getNomsForActor('EMMYS', a).length }} nominations)</li>
              <li>{{ getWinsForActor('GOLDEN_GLOBES', a).length }} Golden Globes ({{ getNomsForActor('GOLDEN_GLOBES', a).length }} nominations)</li>
              <li>{{ getWinsForActor('BAFTAS', a).length }} BAFTAs ({{ getNomsForActor('BAFTAS', a).length }} nominations)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { sortBy } from 'lodash';

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
    };
  },
  computed: {
    actorsSorted() {
      const actorsWithPower = this.actors.filter(a => a.power > 0);
      const actorsWithoutPower = this.actors.filter(a => a.power < 1);
      const actorsWithPowerSorted = sortBy(actorsWithPower, ['power']).reverse();

      return actorsWithPowerSorted.concat(actorsWithoutPower);
    },
  },
  methods: {
    getMcuFilmsListForActor(actor) {
      const films = [];

      actor.mcuFilms.forEach((f) => {
        films.push(`<span>${f.title}</span>`);
      });

      return films.join(', ');
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
  text-decoration: underline;
}
</style>
