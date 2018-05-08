<template>
  <div class="affiliate-card p-2">
    <b-card :title="affiliateItem.title"
        :img-src="affiliateItem.image"
        :img-alt="affiliateItem.title"
        img-top
        tag="article"
        bg-variant="dark"
        class="mb-2 pb-4 text-center position-relative">
      <div class="affiliate-card-btn position-absolute pb-3">
        <b-button :href="affiliateItem.link" variant="primary" target="_blank" rel="noopener">Buy it on Amazon</b-button>
      </div>
    </b-card>
  </div>
</template>

<script>
export default {
  props: ['affiliate-item'],
};
</script>

<style>
.affiliate-card .card-body {
}

.affiliate-card .affiliate-card-btn {
  right: 0;
  bottom: 0;
  left: 0;
}

.affiliate-card .btn-primary {
  background-color: #F0C668;
  color: #222;
}
</style>
