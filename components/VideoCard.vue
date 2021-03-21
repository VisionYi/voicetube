<template>
  <div class="card">
    <figure class="card__figure">
      <v-image class="card__image" :src="image" background-image zoomable />
      <span class="card__time">{{ time }}</span>
    </figure>
    <div class="card__body">
      <h2 class="card__title">
        {{ title }}
      </h2>
      <div class="flex">
        <v-icon class="mr-1" filename="headphones" color="gray" title="觀看人數" />
        <div class="text-gray">
          {{ views }}
        </div>
      </div>
      <div class="card__tag-list">
        <span v-if="lang" class="card__tag">{{ lang }}</span>
        <span class="card__tag card__tag--secondary">{{ level }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VideoCard',
  props: {
    title: {
      type: String,
      default: '',
    },
    time: {
      type: String,
      default: '',
    },
    views: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      default: '',
    },
    level: {
      type: String,
      default: '',
    },
    lang: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.card {
  background-color: #fff;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,0.30);
  border-radius: 4px;

  &__figure {
    position: relative;
  }

  &__image {
    display: block;
    width: 100%;
    border-radius: 4px 4px 0 0;
    overflow: hidden;

    &::before {
      content: '';
      float: left;
      padding-top: 56.25%; // 16 : 9 image size
    }

    &::after {
      content: '';
      display: block;
      clear: both;
    }

    /deep/ .image__background-image {
      position: absolute;
    }
  }

  &__time {
    position: absolute;
    right: 8px;
    bottom: 8px;
    padding: 2px;
    border-radius: 2px;
    background-color: #000;
    color: #fff;
    font-size: 12px;
    line-height: 16px;
  }

  &__body {
    padding: 4px 8px;
    position: relative;
    height: 93px;
  }

  &__title {
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin-bottom: 8px;
  }

  &__tag-list {
    display: flex;
    position: absolute;
    right: 8px;
    bottom: 8px;
  }

  &__tag {
    padding: 2px 8px;
    background-color: $primary;
    color: #fff;
    font-size: 12px;
    letter-spacing: -0.03px;
    border-radius: 2px;

    &:not(:last-child) {
      margin-right: 8px;
    }

    &--secondary {
      background-color: $secondary;
    }
  }
}
</style>
