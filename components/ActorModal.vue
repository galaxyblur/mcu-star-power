<template>
  <b-modal id="modal-selected-actor"
    size="lg"
    hide-footer
    :title="actorName"
    v-model="showModal"
    @hidden="$emit('unselect-actor')">

    <template v-if="actor">
      <div class="clearfix">
        <img :src="actorImg" class="modal-selected-actor-img mr-3 mb-3 float-sm-left">
        <p>
          <strong>{{ actorName }}</strong> has appeared in <strong>{{ actor.filmsCount }}</strong> films,
          including <strong>{{ actor.filmsMcu.length }}</strong> in the Marvel Cinematic Universe.
        </p>
        <p id="modal-selected-actor-mcu-list" v-html="actorMcuList"></p>
        <p>
          Career Power: {{ actor.powerCareer }}<br>
          MCU Power: {{ actor.powerMcu }}
        </p>
      </div>
      <h5 class="text-center">Awards / Nominations</h5>
      <b-row class="text-center">
        <b-col xs="6" sm="3">
          {{ getWinsForEvent('OSCARS').length }} / {{ getNomsForEvent('OSCARS').length }}<br>
          <svg class="icon icon-oscars"><use xlink:href="#icon-oscars"></use></svg><br>Oscars
        </b-col>
        <b-col xs="6" sm="3">
          {{ getWinsForEvent('GOLDEN_GLOBES').length }} / {{ getNomsForEvent('GOLDEN_GLOBES').length }}<br>
          <svg class="icon icon-golden-globes"><use xlink:href="#icon-golden-globe"></use></svg><br>Golden Globes
        </b-col>
        <b-col xs="6" sm="3">
          {{ getWinsForEvent('EMMYS').length }} / {{ getNomsForEvent('EMMYS').length }}<br>
          <svg class="icon icon-emmys"><use xlink:href="#icon-emmys"></use></svg><br>Emmys
        </b-col>
        <b-col xs="6" sm="3">
          {{ getWinsForEvent('BAFTAS').length }} / {{ getNomsForEvent('BAFTAS').length }}<br>
          <svg class="icon icon-baftas"><use xlink:href="#icon-baftas"></use></svg><br>BAFTAs
        </b-col>
      </b-row>
    </template>

  </b-modal>
</template>

<script>
export default {
  props: [
    'actor',
    'actor-mcu-list',
  ],
  data() {
    return {
      showModal: false,
    };
  },
  computed: {
    actorImg() {
      const imgPath = this.actor.img;
      let img = imgPath;

      if (imgPath && imgPath.indexOf('http') < 0) {
        img = require('~/assets/stars/' + imgPath);
      }

      return img;
    },
    actorName() {
      return this.actor ? `${this.actor.actorName}'s ${this.characterDisplayName}` : '';
    },
    characterDisplayName() {
      return this.actor.characterDisplayName || this.actor.filmsMcu[0].characterName;
    },
  },
  watch: {
    actor(val) {
      if (typeof val === 'object' && val !== null) {
        this.showModal = true;
      } else {
        this.showModal = false;
      }
    },
  },
  methods: {
    getNomsForEvent(event) {
      return this.actor.awards.filter(aw => aw.event === event);
    },
    getWinsForEvent(event) {
      return this.actor.awards.filter(aw => (aw.event === event && aw.winner === true));
    },
    handleModalHide() {
      this.$emit('unselect-actor');
      this.showModal = false;
    },
  },
};
</script>

<style>
#modal-selected-actor-mcu-list {
  font-style: italic;
}

#modal-selected-actor-mcu-list a {
  color: #F0C668;
}

#modal-selected-actor-mcu-list a:active,
#modal-selected-actor-mcu-list a:focus,
#modal-selected-actor-mcu-list a:hover {
  background-color: #F0C668;
  color: #222;
}

#modal-selected-actor .modal-selected-actor-img {
  height: 400px;
}

#modal-selected-actor .icon {
  fill: #f9be00;
}
</style>
