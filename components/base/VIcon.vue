<template>
  <!-- eslint-disable vue/no-v-html -->
  <i
    ref="icon"
    class="icon"
    :class="[
      color ? COLOR[color] : '',
      {
        'is-original-color': originalColor,
      }
    ]"
    :title="title"
    v-html="getIconHTML()"
  />
</template>

<script>
export const COLOR = {
  primary: 'is-primary',
  secondary: 'is-secondary',
  gray: 'is-gray',
}

export default {
  name: 'VIcon',
  props: {
    /**
     * the real SVG icon filename
     */
    filename: {
      type: String,
      default: '',
    },
    /**
     * color for the icon
     */
    color: {
      type: String,
      default: undefined,
      validator (value) {
        return Object.keys(COLOR).includes(value)
      }
    },
    /**
     * if ture, it just use orginal svg image color. if false, it use CSS fill to control the color.
     */
    originalColor: {
      type: Boolean,
      default: false
    },
    /**
     * title attribute
     */
    title: {
      type: String,
      default: '',
    },
  },
  data () {
    return {
      COLOR,
    }
  },
  methods: {
    resetIconSVG () {
      if (this.originalColor) return

      this.$nextTick(() => {
        const iconEl = this.$refs.icon
        if (!iconEl) return
        const svgEl = iconEl.firstChild

        if (svgEl.nodeName === 'svg') {
          const setAttributeClassName = (el, attributeName, className = attributeName) => {
            const attr = el.getAttribute(attributeName)
            if (attr && attr !== 'none' && !(/^#(fff|ffffff)$/i.test(attr))) {
              el.classList.add(className)
            }
          }

          const recursivelyAddAttribute = (el) => {
            setAttributeClassName(el, 'fill')
            setAttributeClassName(el, 'stroke');

            [].forEach.call(el.children, (child) => {
              recursivelyAddAttribute(child)
            })
          }

          recursivelyAddAttribute(iconEl)
        }
      })
    },
    getIconHTML () {
      if (!this.filename) return ''
      try {
        // eslint-disable-next-line import/no-dynamic-require, global-require
        const content = require(`!html-loader!../../assets/icons/${this.filename}.svg`)
        this.resetIconSVG()
        return content
      } catch (error) {
        return ''
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.icon {
  display: inline-flex;
  width: 20px;
  height: 20px;
  color: inherit;
  line-height: 1;
  letter-spacing: normal;
  vertical-align: top;
  transition: inherit;

  /deep/ {
    > svg {
      width: 100%;
      height: 100%;
    }
  }

  &:not(.is-original-color) /deep/ svg {
    .fill {
      fill: currentColor;
    }
    .stroke {
      stroke: currentColor;
    }
  }

  &.is-primary {
    color: $primary;
  }

  &.is-secondary {
    color: $secondary;
  }

  &.is-gray {
    color: $gray-500;
  }
}
</style>
