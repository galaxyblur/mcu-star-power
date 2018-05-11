<template>
  <div class="actor-card mb-3" v-lazy:background-image="actorImg">
    <b-card class="position-relative" @click="$emit('select-actor', actor)">
      <div class="actor-card-accolades position-absolute">
        <div v-b-tooltip.hover title="Career films | MCU films">
          <font-awesome-icon :icon="iconFilm" />
          {{ actor.filmsCount }} | {{ actor.filmsMcu.length }}*
        </div>
        <div v-b-tooltip.hover title="Oscar Wins/Nominations">
          <svg class="icon icon-oscars"><use xlink:href="#icon-oscars"></use></svg>
          <template v-if="getNomsForEvent('OSCARS').length > 0">
            <span class="h4">{{ getWinsForEvent('OSCARS').length }}</span> / {{ getNomsForEvent('OSCARS').length }}
          </template>
          <span v-else class="h4">0</span>
        </div>
        <div v-b-tooltip.hover title="Golden Globe Wins/Nominations">
          <svg class="icon icon-golden-globes"><use xlink:href="#icon-golden-globe"></use></svg>
          <template v-if="getNomsForEvent('GOLDEN_GLOBES').length > 0">
            <span class="h4">{{ getWinsForEvent('GOLDEN_GLOBES').length }}</span> / {{ getNomsForEvent('GOLDEN_GLOBES').length }}
          </template>
          <span v-else class="h4">0</span>
        </div>
        <div v-b-tooltip.hover title="Emmy Wins/Nominations">
          <svg class="icon icon-emmys"><use xlink:href="#icon-emmys"></use></svg>
          <template v-if="getNomsForEvent('EMMYS').length > 0">
            <span class="h4">{{ getWinsForEvent('EMMYS').length }}</span> / {{ getNomsForEvent('EMMYS').length }}
          </template>
          <span v-else class="h4">0</span>
        </div>
        <div v-b-tooltip.hover title="BAFTA Wins/Nominations">
          <svg class="icon icon-baftas"><use xlink:href="#icon-baftas"></use></svg>
          <template v-if="getNomsForEvent('BAFTAS').length > 0">
            <span class="h4">{{ getWinsForEvent('BAFTAS').length }}</span> / {{ getNomsForEvent('BAFTAS').length }}
          </template>
          <span v-else class="h4">0</span>
        </div>
      </div>
      <div class="actor-card-footer text-center position-absolute p-2">
        <b-row>
          <b-col cols="3" v-b-tooltip.hover title="Career Power">
            <font-awesome-icon :icon="iconStar" /><br>
            {{ actor.powerCareer }}
          </b-col>
          <b-col cols="6">
            {{ actor.actorName }}<br>
            <i>{{ characterDisplayName }}</i>
          </b-col>
          <b-col cols="3" v-b-tooltip.hover title="MCU Power">
            <svg class="icon icon-avengers"><use xlink:href="#icon-avengers"></use></svg><br>
            {{ actor.powerMcu }}
          </b-col>
        </b-row>
        <div v-if="actorLastMcuFilm" class="actor-card-last-seen mt-2 text-center h6">
          Last seen in <affiliate-link-film :text="actorLastMcuFilm.title" :link="actorLastMcuFilm.link" />
        </div>
        <div v-if="actorHasAffLink" class="actor-card-last-seen mt-2 text-center h6">
          Hot item: <affiliate-link-other :text="actor.affiliateLink.title" :link="actor.affiliateLink.link" />
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import faFilm from '@fortawesome/fontawesome-free-solid/faFilm';
import faStar from '@fortawesome/fontawesome-free-solid/faStar';

import AffiliateLinkFilm from '../components/AffiliateLinkFilm';
import AffiliateLinkOther from '../components/AffiliateLinkOther';
import affiliateLinks from '../static/json/aff-links.json';

export default {
  components: {
    AffiliateLinkFilm,
    AffiliateLinkOther,
    FontAwesomeIcon,
  },
  props: [
    'actor',
  ],
  data() {
    return {
      aff: affiliateLinks,
      iconFilm: faFilm,
      iconStar: faStar,
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
    actorHasAffLink() {
      return this.actor.affiliateLink && this.actor.affiliateLink.title && this.actor.affiliateLink.link;
    },
    actorLastMcuFilm() {
      const releasedFilms = this.actor.filmsMcu.filter(f => f.isReleased === true);
      let film;

      if (releasedFilms && releasedFilms.length > 0) {
        film = releasedFilms[releasedFilms.length - 1];

        const [ link ] = this.aff.filter((l) => {
          return l.type === 'film' && l.title === film.title;
        });

        if (link) {
          film.link = link.link;
        }
      }

      return film;
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
  background-color: #555;
  background-blend-mode: overlay;
  background-position: center;
  background-size: cover;
}

.actor-card .card {
  background-color: transparent;
}

.actor-card .card-body {
  height: 500px;
  text-shadow: 0 0 4px black;
}

.actor-card .card-body .icon {
  filter: drop-shadow(0 0 4px black);
}

.actor-card .actor-card-accolades {
  top: 0;
}

.actor-card .actor-card-footer {
  right: 0;
  bottom: 0;
  left: 0;
}

.actor-card > div {
  cursor: pointer;
}

.actor-card .actor-card-accolades > div {
  margin: 12px 0;
  height: 24px;
}

.actor-card >>> .actor-card-last-seen a {
  color: #F0C668;
  padding: 3px;
}

.actor-card >>> .actor-card-last-seen span > span {
  font-style: italic;
}

.actor-card:active,
.actor-card:focus,
.actor-card:hover {
  color: #fff;
  background-blend-mode: hard-light;
}

.actor-card:active .card-body >>> .actor-card-last-seen a,
.actor-card:focus .card-body >>> .actor-card-last-seen a,
.actor-card:hover .card-body >>> .actor-card-last-seen a {
  background-color: #F0C668;
  color: #222;
}

.actor-card:active .icon,
.actor-card:focus .icon,
.actor-card:hover .icon {
  fill: #fff;
}

.actor-card:active .actor-card-accolades .icon,
.actor-card:focus .actor-card-accolades .icon,
.actor-card:hover .actor-card-accolades .icon {
  fill: #f9be00;
}
</style>
