<template>
  <div id="modal-selected-actor" uk-modal @hide="$emit('unselect-actor')">
    <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical uk-box-shadow-xlarge">
      <button class="uk-modal-close-default" type="button" uk-close></button>
      <template v-if="actor">
        <div class="uk-modal-header">
          <h2 class="uk-modal-title">
            {{ actor.actorName }}<br>
            <small class="uk-text-meta">{{ characterDisplayName }}</small>
          </h2>
        </div>
        <div class="uk-modal-body">
          <img :src="actorImg" class="uk-align-left uk-height-medium">
          <p>
            <strong>{{ actor.actorName }}</strong> has appeared in <strong>{{ actor.filmsCount }}</strong> films,
            including <strong>{{ actor.filmsMcu.length }}</strong> in the Marvel Cinematic Universe.
          </p>
          <p id="modal-selected-actor-mcu-list" class="uk-text-meta" v-html="actorMcuList"></p>
          <p>
            Career Power: {{ actor.powerCareer }}<br>
            MCU Power: {{ actor.powerMcu }}
          </p>
        </div>
        <div class="uk-modal-footer uk-text-center">
          <h5>Awards / Nominations</h5>
          <div class="uk-flex uk-child-width-1-4">
            <div>
              {{ getWinsForEvent('OSCARS').length }} / {{ getNomsForEvent('OSCARS').length }}<br>
              <svg class="icon icon-oscars"><use xlink:href="#icon-oscars"></use></svg><br>Oscars
            </div>
            <div>
              {{ getWinsForEvent('GOLDEN_GLOBES').length }} / {{ getNomsForEvent('GOLDEN_GLOBES').length }}<br>
              <svg class="icon icon-golden-globes"><use xlink:href="#icon-golden-globe"></use></svg><br>Golden Globes
            </div>
            <div>
              {{ getWinsForEvent('EMMYS').length }} / {{ getNomsForEvent('EMMYS').length }}<br>
              <svg class="icon icon-emmys"><use xlink:href="#icon-emmys"></use></svg><br>Emmys
            </div>
            <div>
              {{ getWinsForEvent('BAFTAS').length }} / {{ getNomsForEvent('BAFTAS').length }}<br>
              <svg class="icon icon-baftas"><use xlink:href="#icon-baftas"></use></svg><br>BAFTAs
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'actor',
    'actor-mcu-list',
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
#modal-selected-actor-mcu-list {
  font-style: italic;
}

#modal-selected-actor-mcu-list a {
  text-decoration: underline;
}
</style>
