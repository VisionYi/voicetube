<template>
  <div class="image" :class="{ 'image--zoomable': zoomable }">
    <div
      v-if="backgroundImage"
      v-lazy:background-image="src"
      class="image__background-image"
    />
    <img v-else v-lazy="src" :alt="alt">
  </div>
</template>

<script>
export default {
  name: 'VImage',
  props: {
    src: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: ''
    },
    backgroundImage: Boolean,
    zoomable: Boolean,
  },
}
</script>

<style lang="scss" scoped>
.image {
  border-radius: inherit;
  overflow: hidden;

  &--zoomable {
    .image__background-image {
      transition: background-size 0.3s ease-out;
      background-size: 100%;

      &:hover {
        background-size: 115%;
      }
    }
  }

  &__background-image {
    display: block;
    border-radius: inherit;
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: cover;
    background-color: $gray-500;
    background-repeat: no-repeat;
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: inherit;
    background-color: $gray-500;
  }
}
</style>
