<template>
  <div class="actor-card uk-padding-small">
    <div class="uk-card uk-card-default uk-height-1-1 uk-box-shadow-large" uk-toggle="target:#modal-selected-actor" @click="$emit('select-actor', actor)">
      <div class="uk-card-body uk-height-1-1 uk-background-cover uk-background-blend-overlay" :style="'background-image:url('+actorImg+')'">
        <div class="actor-card-accolades uk-overlay uk-position-top-left uk-text-small">
          <div uk-tooltip="title: Career films | MCU films">
            <i class="fa fa-film"></i>
            {{ actor.filmsCount }} | {{ actor.filmsMcu.length }}*
          </div>
          <div uk-tooltip="title: Oscar Wins/Nominations">
            <svg class="icon icon-oscars"><use xlink:href="#icon-oscars"></use></svg>
            {{ getWinsForEvent('OSCARS').length }}/{{ getNomsForEvent('OSCARS').length }}
          </div>
          <div uk-tooltip="title: Golden Globe Wins/Nominations">
            <svg class="icon icon-golden-globes"><use xlink:href="#icon-golden-globe"></use></svg>
            {{ getWinsForEvent('GOLDEN_GLOBES').length }}/{{ getNomsForEvent('GOLDEN_GLOBES').length }}
          </div>
          <div uk-tooltip="title: Emmy Wins/Nominations">
            <svg class="icon icon-emmys"><use xlink:href="#icon-emmys"></use></svg>
            {{ getWinsForEvent('EMMYS').length }}/{{ getNomsForEvent('EMMYS').length }}
          </div>
          <div uk-tooltip="title: BAFTA Wins/Nominations">
            <svg class="icon icon-baftas"><use xlink:href="#icon-baftas"></use></svg>
            {{ getWinsForEvent('BAFTAS').length }}/{{ getNomsForEvent('BAFTAS').length }}
          </div>
        </div>
        <div class="uk-overlay uk-width-1-1 uk-position-bottom-center">
          <div class="uk-text-center uk-flex">
            <div class="uk-width-1-5" uk-tooltip="title: Career Power">
              <i class="fa fa-star" aria-hidden="true"></i><br>
              {{ actor.powerCareer }}
            </div>
            <div class="uk-width-3-5">
              {{ actor.actorName }}<br>
              <i class="uk-text-meta">{{ characterDisplayName }}</i>
            </div>
            <div class="uk-width-1-5" uk-tooltip="title: MCU Power">
              <svg class="icon icon-avengers"><use xlink:href="#icon-avengers"></use></svg><br>
              {{ actor.powerMcu }}
            </div>
          </div>
          <div v-if="actorLastSeenEl" class="actor-card-last-seen uk-margin-top uk-text-center uk-text-small">
            Last seen in <span v-html="actorLastSeenEl" @click.stop></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'actor',
    'actorLastSeenEl',
  ],
  computed: {
    actorImg() {
      const imgPath = this.actor.img;
      let img = imgPath;

      if (imgPath && imgPath.indexOf('http') < 0) {
        img = require('~/assets/stars/' + imgPath);
      }

      return img;
    },
    characterDisplayName() {
      return this.actor.characterDisplayName || this.actor.filmsMcu[0].characterName;
    },
  },
  methods: {
    getNomsForEvent(event) {
      return this.actor.awards.filter(aw => aw.event === event);
    },
    getWinsForEvent(event) {
      return this.actor.awards.filter(aw => (aw.event === event && aw.winner === true));
    },
  },
};
</script>

<style scoped>
.actor-card {
  height: 500px;
}

.actor-card > div {
  cursor: pointer;
}

.actor-card .uk-card-body {
  background-color: #333;
}

.actor-card .actor-card-accolades > div {
  margin: 12px 0;
}

.actor-card >>> .actor-card-last-seen a {
  color: #F0C668;
  padding: 3px;
}

.actor-card >>> .actor-card-last-seen span > span {
  font-style: italic;
}

.actor-card:active .uk-card-body,
.actor-card:focus .uk-card-body,
.actor-card:hover .uk-card-body {
  color: #fff;
  background-blend-mode: hard-light;
}

.actor-card:active .uk-card-body >>> .actor-card-last-seen a,
.actor-card:focus .uk-card-body >>> .actor-card-last-seen a,
.actor-card:hover .uk-card-body >>> .actor-card-last-seen a {
  background-color: #F0C668;
  color: #222;
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
</style>
