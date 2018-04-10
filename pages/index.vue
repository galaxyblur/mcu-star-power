<template>
  <div class="uk-container uk-container-expand">

    <icons />

    <div class="uk-text-center">
      <h2>Who are the biggest stars in the Marvel Cinematic Universe?</h2>
    </div>

    <section class="uk-section">
      <ul class="uk-subnav uk-subnav-pill" uk-margin>
        <li :class="{ 'uk-active': this.sort === 'powerCareer' }"><a href="#" @click.prevent="sort = 'powerCareer'">Career Power <i class="fa fa-star" aria-hidden="true"></i></a></li>
        <li :class="{ 'uk-active': this.sort === 'powerMcu' }"><a href="#" @click.prevent="sort = 'powerMcu'">MCU Power <svg class="icon icon-avengers"><use xlink:href="#icon-avengers"></use></svg></a></li>
      </ul>
      <div class="uk-flex uk-flex-wrap uk-child-width-1-5@xl uk-child-width-1-4@l uk-child-width-1-3@m uk-child-width-1-2@s">
        <div v-for="(a, ai) in actorsSorted" :key="ai" class="actor-card uk-padding-small">
          <div class="uk-card uk-card-default uk-height-1-1 uk-box-shadow-large" uk-toggle="target:#modal-selected-actor" @click="selectedActor = a">
            <div class="uk-card-body uk-height-1-1 uk-background-cover uk-background-blend-overlay" :style="'background-image:url('+a.img+')'">
              <div class="uk-overlay uk-width-1-1 uk-position-bottom-center">
                <div class="uk-text-center uk-flex">
                  <div class="uk-width-1-5"><i class="fa fa-star" aria-hidden="true"></i><br>{{ a.powerCareer }}</div>
                  <div class="uk-width-3-5">
                    {{ a.actorName }}<br>
                    <i class="uk-text-meta">{{ getCharacterDisplayNameForActor(a) }}</i>
                  </div>
                  <div class="uk-width-1-5"><svg class="icon icon-avengers"><use xlink:href="#icon-avengers"></use></svg><br>{{ a.powerMcu }}</div>
                </div>
              </div>
              <div class="actor-card-accolades uk-overlay uk-position-top-left uk-text-small">
                <div>
                  <svg class="icon icon-video-camera"><use xlink:href="#icon-video-camera"></use></svg>
                  {{ a.filmsCount }}
                </div>
                <div>
                  <svg class="icon icon-oscars"><use xlink:href="#icon-oscars"></use></svg>
                  {{ getWinsForActor('OSCARS', a).length }}/{{ getNomsForActor('OSCARS', a).length }}
                </div>
                <div>
                  <svg class="icon icon-emmys"><use xlink:href="#icon-emmys"></use></svg>
                  {{ getWinsForActor('EMMYS', a).length }}/{{ getNomsForActor('EMMYS', a).length }}</div>
              </div>
              <div class="actor-card-accolades uk-overlay uk-position-top-right uk-text-right uk-text-small">
                <div>
                  {{ a.filmsMcu.length }}
                  <svg class="icon icon-avengers"><use xlink:href="#icon-avengers"></use></svg>
                </div>
                <div>
                  {{ getWinsForActor('GOLDEN_GLOBES', a).length }}/{{ getNomsForActor('GOLDEN_GLOBES', a).length }}
                  <svg class="icon icon-golden-globes"><use xlink:href="#icon-golden-globe"></use></svg>
                </div>
                <div>
                  {{ getWinsForActor('BAFTAS', a).length }}/{{ getNomsForActor('BAFTAS', a).length }}
                  <svg class="icon icon-baftas"><use xlink:href="#icon-baftas"></use></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div id="modal-selected-actor" uk-modal @hide="selectedActor = undefined">
      <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical uk-box-shadow-xlarge">
        <button class="uk-modal-close-default" type="button" uk-close></button>
        <template v-if="selectedActor">
          <div class="uk-modal-header">
            <h2 class="uk-modal-title">
              {{ selectedActor.actorName }}<br>
              <small class="uk-text-meta">{{ getCharacterDisplayNameForActor(selectedActor) }}</small>
            </h2>
          </div>
          <div class="uk-modal-body">
            <img :src="selectedActor.img" class="uk-align-left uk-height-medium">
            <p>
              <strong>{{ selectedActor.actorName }}</strong> has appeared in <strong>{{ selectedActor.filmsCount }}</strong> films,
              including <strong>{{ selectedActor.filmsMcu.length }}</strong> in the Marvel Cinematic Universe.
            </p>
            <p class="uk-text-meta" v-html="'<i>' + getMcuListForActor(selectedActor) + '</i>'"></p>
            <p>
              Career Power: {{ selectedActor.powerCareer }}<br>
              MCU Power: {{ selectedActor.powerMcu }}
            </p>
          </div>
          <div class="uk-modal-footer uk-text-center">
            <h5>Awards / Nominations</h5>
            <div class="uk-flex uk-child-width-1-4">
              <div>
                {{ getWinsForActor('OSCARS', selectedActor).length }} / {{ getNomsForActor('OSCARS', selectedActor).length }}<br>
                <svg class="icon icon-oscars"><use xlink:href="#icon-oscars"></use></svg><br>Oscars
              </div>
              <div>
                {{ getWinsForActor('GOLDEN_GLOBES', selectedActor).length }} / {{ getNomsForActor('GOLDEN_GLOBES', selectedActor).length }}<br>
                <svg class="icon icon-golden-globes"><use xlink:href="#icon-golden-globe"></use></svg><br>Golden Globes
              </div>
              <div>
                {{ getWinsForActor('EMMYS', selectedActor).length }} / {{ getNomsForActor('EMMYS', selectedActor).length }}<br>
                <svg class="icon icon-emmys"><use xlink:href="#icon-emmys"></use></svg><br>Emmys
              </div>
              <div>
                {{ getWinsForActor('BAFTAS', selectedActor).length }} / {{ getNomsForActor('BAFTAS', selectedActor).length }}<br>
                <svg class="icon icon-baftas"><use xlink:href="#icon-baftas"></use></svg><br>BAFTAs
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>

  </div>
</template>

<script>
import {
  map,
  sortBy,
  uniq,
} from 'lodash';

import Icons from '../components/Icons';

export default {
  components: {
    Icons,
  },
  async asyncData({ app }) {
    let { data } = await app.$axios.get('json/aggregate.json');

    return {
      actors: data,
    };
  },
  data() {
    return {
      actors: [],
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
    getMcuListForActor(actor) {
      const films = [];

      actor.filmsMcu.forEach((f) => {
        films.push(`<span>${f.title}</span>`);
      });

      return films.join(', ');
    },
    getCharacterDisplayNameForActor(actor) {
      return actor.characterDisplayName || actor.filmsMcu[0].characterName;
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
.actor-card {
  height: 400px;
}

.actor-card > div {
  cursor: pointer;
}

.actor-card .uk-card-body {
  background-color: #333;
}

.actor-card:active .uk-card-body,
.actor-card:focus .uk-card-body,
.actor-card:hover .uk-card-body {
  color: #fff;
  background-blend-mode: hard-light;
}

.actor-card .actor-card-accolades > div {
  margin: 12px 0;
}

.icon {
  width: 24px;
  height: 24px;
  fill: #ccc;
}

.actor-card:active .uk-card-body .icon,
.actor-card:focus .uk-card-body .icon,
.actor-card:hover .uk-card-body .icon {
  fill: #fff;
}

.actor-card:active .uk-card-body .actor-card-accolades .icon,
.actor-card:focus .uk-card-body .actor-card-accolades .icon,
.actor-card:hover .uk-card-body .actor-card-accolades .icon {
  fill: #f9be00;
}

.uk-subnav .icon {
  fill: #ccc;
}
</style>
