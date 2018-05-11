<template>
  <span>
    <a v-if="asin" :href="getURLForAmazonLink(asin)" target="_blank" rel="noopener nofollow" @click.stop><font-awesome-icon :icon="iconPlayCircle" /> {{ text }}</a>
    <span v-else>{{ text }}</span>
  </span>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import faPlayCircle from '@fortawesome/fontawesome-free-solid/faPlayCircle';

import {
  getURLForAmazonLink,
} from '../lib/AffiliateLinksHelper';

export default {
  components: {
    FontAwesomeIcon,
  },
  props: [
    'asin',
    'text',
  ],
  data() {
    return {
      iconPlayCircle: faPlayCircle,
    };
  },
  methods: {
    getURLForAmazonLink,
  },
};
</script>
