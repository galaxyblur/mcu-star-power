<template>
  <span>
    <a v-if="link" :href="link" target="_blank" rel="noopener nofollow" @click.stop><font-awesome-icon :icon="iconPlayCircle" /> {{ text }}</a>
    <span v-else>{{ text }}</span>
  </span>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import faPlayCircle from '@fortawesome/fontawesome-free-solid/faPlayCircle';

export default {
  components: {
    FontAwesomeIcon,
  },
  props: [
    'link',
    'text',
  ],
  data() {
    return {
      iconPlayCircle: faPlayCircle,
    };
  },
};
</script>
