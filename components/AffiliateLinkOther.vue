<template>
  <span>
    <a v-if="link" :href="link" target="_blank" rel="noopener nofollow" @click.stop><font-awesome-icon :icon="iconRocket" /> {{ text }}</a>
    <span v-else>{{ text }}</span>
  </span>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import faRocket from '@fortawesome/fontawesome-free-solid/faRocket';

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
      iconRocket: faRocket,
    };
  },
};
</script>
