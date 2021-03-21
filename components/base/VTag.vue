<template>
  <span
    class="tag"
    :class="{
      'is-active': isChecked(),
      'is-radio-mode': isRadioMode,
    }"
    tabindex="0"
    @click="onClick()"
  >
    <slot />
  </span>
</template>

<script>
export default {
  name: 'VTag',
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    /**
     * Tag id
     * if 'checked' v-model's type is Array, this id is required.
     */
    id: {
      type: [String, Number],
      default: 0
    },
    /**
     * for v-model value
     */
    checked: {
      type: [Boolean, Array, String, Number],
      default: false
    },
  },
  computed: {
    $_checked: {
      get () {
        return this.checked
      },
      set (value) {
        this.$emit('change', value)
      }
    },
    isRadioMode () {
      return typeof this.$_checked === 'string' || typeof this.$_checked === 'number'
    }
  },
  methods: {
    onClick () {
      this.tiggerTagChange()
    },

    tiggerTagChange () {
      if (typeof this.$_checked === 'string' || typeof this.$_checked === 'number') {
        this.$_checked = this.id
      } else if (typeof this.$_checked === 'object') {
        const index = this.$_checked.indexOf(this.id)
        if (index !== -1) {
          this.$_checked.splice(index, 1)
        } else {
          this.$_checked.push(this.id)
        }
      } else {
        this.$_checked = !this.$_checked
      }
    },

    isChecked () {
      if (typeof this.$_checked === 'string' || typeof this.$_checked === 'number') {
        return this.$_checked === this.id
      }
      if (typeof this.$_checked === 'object') {
        return this.$_checked.includes(this.id)
      }
      return this.$_checked
    }
  }
}
</script>

<style lang="scss" scoped>
.tag {
  display: inline-flex;
  font-size: 12px;
  line-height: 16px;
  padding: 4px 8px;
  border-radius: 4px;
  color: $gray-500;
  background-color: transparent;
  transition: all 0.15s cubic-bezier(.4,0,.2,1);
  cursor: pointer;
  outline: none;

  &:hover {
    opacity: 0.7;
  }

  &.is-active {
    background-color: $primary;
    color: #fff;
  }

  &.is-radio-mode {
    opacity: 1;

    &.is-active {
      cursor: default;
    }
  }
}
</style>
