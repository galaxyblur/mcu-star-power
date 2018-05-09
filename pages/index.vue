<template>
  <b-container fluid>
    <icons />
    <tabs />

    <div class="mt-4">
      <b-nav pills>
        <b-nav-item :active="this.sort === 'powerMcu'" @click="sort = 'powerMcu'">MCU Power <svg class="icon icon-avengers"><use xlink:href="#icon-avengers"></use></svg></b-nav-item>
        <b-nav-item :active="this.sort === 'powerCareer'" @click="sort = 'powerCareer'">Career Power <font-awesome-icon :icon="iconStar" /></b-nav-item>
      </b-nav>

      <b-row class="mt-3">
        <template v-for="a in actorsSorted">
          <!--
          <b-col v-if="a.actorName === 'Stan Lee'" cols="12" :key="a.id">
            <div class="card">
              <div class="card-body text-center">
                Honorable Mention: {{ a.actorName }}
              </div>
            </div>
          </b-col>
          -->
          <b-col v-if="a.actorName !== 'Stan Lee'" sm="12" md="6" lg="4" :key="a.id">
            <actor-card :actor="a" @select-actor="handleSelectActor" />
          </b-col>
        </template>
      </b-row>
    </div>

    <actor-modal :actor="selectedActor" @unselect-actor="handleUnselectActor" />
  </b-container>
</template>

<script>
import {
  map,
  sortBy,
  uniq,
} from 'lodash';

import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import faStar from '@fortawesome/fontawesome-free-solid/faStar';

import ActorCard from '../components/ActorCard';
import ActorModal from '../components/ActorModal';
import Icons from '../components/Icons';
import Tabs from '../components/Tabs';

import aggregateActors from '../static/json/aggregate.json';

export default {
  components: {
    FontAwesomeIcon,
    ActorCard,
    ActorModal,
    Icons,
    Tabs,
  },
  data() {
    return {
      actors: aggregateActors,
      selectedActor: undefined,
      sort: 'powerMcu',
      iconStar: faStar,
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
  fill: #eee;
}

.nav .nav-link .icon {
  vertical-align: middle;
}

.nav .nav-link:not(.active) .icon {
  fill: violet;
}
</style>
