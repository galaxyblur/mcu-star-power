<template>
  <div class="affiliate-card uk-padding-small">
    <div class="uk-card uk-card-default uk-height-1-1 uk-box-shadow-large">
      <div class="uk-card-header">
        <h4 class="uk-card-title">{{ affiliateItem.title }}</h4>
      </div>
      <div class="uk-card-body">
        <img :src="affiliateItem.image">
      </div>
      <div class="uk-card-footer">
        <a class="uk-button uk-button-primary" :href="affiliateItem.link" target="_blank">Buy on Amazon</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['affiliate-item'],
};
</script>

<style>
.affiliate-card .uk-card-header {
  min-height: 56px;
}

.affiliate-card .uk-card-title {
  font-size: 1.25rem; /* a la uk-h4 */
}

.affiliate-card .uk-button-primary {
  background-color: #F0C668;
  color: #222;
}
</style>
