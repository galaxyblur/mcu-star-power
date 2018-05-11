<template>
  <b-modal id="modal-selected-actor"
    size="lg"
    hide-footer
    :title="actorNameAndCharacter"
    v-model="showModal"
    @hidden="$emit('unselect-actor')">

    <template v-if="actor">

      <b-row>
        <b-col cols="12" sm="5">
          <img :src="actorImg" class="modal-selected-actor-img">
        </b-col>
        <b-col cols="12" sm="7">
          <p>
            <strong>{{ actorName }}</strong>
            (Career Power <span class="badge badge-primary">{{ actor.powerCareer }}</span>,
            MCU Power <span class="badge badge-primary">{{ actor.powerMcu }}</span>)
            has appeared in <strong>{{ actor.filmsCount }}</strong> films,
            including <strong>{{ actor.filmsMcu.length }}</strong> in the Marvel Cinematic Universe.
          </p>

          <p id="modal-selected-actor-mcu-list">
            <span v-for="(f, fi) in actor.filmsMcu" :key="fi">
              <affiliate-link-film :text="f.title" :asin="getAffLinkASINForFilm(f)" />
              <template v-if="fi < actor.filmsMcu.length - 1">, </template>
            </span>
          </p>

          <template v-if="actorHasAffLink">
            <h5>Coolest Stuff</h5>
            <p id="modal-selected-actor-aff-links">
              <affiliate-link-other :text="actor.affiliateLink.title" :asin="actor.affiliateLink.asin" />
            </p>
          </template>

          <h5>Awards / Nominations</h5>
          <div id="modal-selected-actor-awards-accordion" role="tablist">
            <b-card no-body v-for="(awards, ai) in awardsByEvent" :key="ai">
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-btn block variant="primary" href="#" v-b-toggle="'modal-selected-actor-awards-' + ai" :disabled="awards.wins.length < 1 && awards.nomsOnly.length < 1">
                  <svg :class="'icon ' + awards.icon"><use :xlink:href="'#' + awards.icon"></use></svg>
                  <template v-if="awards.wins.length > 0 || awards.nomsOnly.length > 0">
                    {{ awards.wins.length }} / {{ awards.noms.length }}
                  </template>
                  <template v-else>0</template>
                  {{ awards.displayName }}
                </b-btn>
              </b-card-header>
              <b-collapse :id="'modal-selected-actor-awards-' + ai" accordion="modal-selected-actor-awards-accordion" role="tabpanel">
                <b-card-body>
                  <div v-if="awards.wins.length > 0 || awards.nomsOnly.length > 0">
                    <template v-if="awards.wins.length > 0">
                      <h6>Wins</h6>
                      <ul>
                        <li v-for="(aw, awi) in awards.wins" :key="awi">
                          {{ aw.category }}
                          <span v-if="aw.title">for <i>{{ aw.title }}</i>&nbsp;</span>
                          <span v-if="aw.character">as <i>{{ aw.character }}</i>&nbsp;</span>
                          <span v-if="aw.year">({{ aw.year }})</span>
                        </li>
                      </ul>
                    </template>
                    <template v-if="awards.nomsOnly.length > 0">
                      <h6>Nominations</h6>
                      <ul>
                        <li v-for="(aw, awi) in awards.nomsOnly" :key="awi">
                          {{ aw.category }}
                          <span v-if="aw.title">for <i>{{ aw.title }}</i>&nbsp;</span>
                          <span v-if="aw.character">as <i>{{ aw.character }}</i>&nbsp;</span>
                          <span v-if="aw.year">({{ aw.year }})</span>
                        </li>
                      </ul>
                    </template>
                  </div>
                  <span v-else>--</span>
                </b-card-body>
              </b-collapse>
            </b-card>
          </div>
        </b-col>
      </b-row>

    </template>

  </b-modal>
</template>

<script>
import { difference } from 'lodash';

import AffiliateLinkFilm from '../components/AffiliateLinkFilm';
import AffiliateLinkOther from '../components/AffiliateLinkOther';

import {
  affiliateLinks,
} from '../lib/AffiliateLinksHelper';

export default {
  components: {
    AffiliateLinkFilm,
    AffiliateLinkOther,
  },
  props: [
    'actor',
  ],
  data() {
    return {
      aff: affiliateLinks,
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
    actorHasAffLink() {
      return this.actor.affiliateLink && this.actor.affiliateLink.title && this.actor.affiliateLink.asin;
    },
    actorName() {
      return this.actor ? this.actor.actorName : '';
    },
    actorNameAndCharacter() {
      return this.actor ? `${this.actor.actorName} as ${this.characterDisplayName}` : '';
    },
    awardsByEvent() {
      const aw = [
        {
          key: 'OSCARS',
          icon: 'icon-oscars',
          displayName: 'Oscars',
        },
        {
          key: 'GOLDEN_GLOBES',
          icon: 'icon-golden-globe',
          displayName: 'Golden Globes',
        },
        {
          key: 'EMMYS',
          icon: 'icon-emmys',
          displayName: 'Emmys',
        },
        {
          key: 'BAFTAS',
          icon: 'icon-baftas',
          displayName: 'BAFTAS',
        },
      ];

      aw.forEach((a) => {
        a.wins = this.getWinsForEvent(a.key);
        a.noms = this.getNomsForEvent(a.key);
        a.nomsOnly = difference(a.noms, a.wins);
      });

      return aw;
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
    getAffLinkASINForFilm(film) {
      const [ link ] = this.aff.filter((l) => {
        return l.type === 'film' && l.title === film.title;
      });

      return link ? link.asin : undefined;
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

#modal-selected-actor-mcu-list a,
#modal-selected-actor-aff-links a {
  color: #F0C668;
}

#modal-selected-actor-mcu-list a:active,
#modal-selected-actor-mcu-list a:focus,
#modal-selected-actor-mcu-list a:hover,
#modal-selected-actor-aff-links a:active,
#modal-selected-actor-aff-links a:focus,
#modal-selected-actor-aff-links a:hover {
  background-color: #F0C668;
  color: #222;
}

#modal-selected-actor .modal-selected-actor-img {
  width: 100%;
}

#modal-selected-actor .icon {
  fill: #f9be00;
}
</style>
