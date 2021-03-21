import base, { filename } from 'paths.macro'
import { argEvents, dirnameTitle, controlOptions } from '@/.storybook/utils'
import VIcon, { COLOR } from '@/components/base/VIcon.vue'

export default {
  title: dirnameTitle(base, filename),
  component: VIcon,
  argTypes: {
    color: controlOptions(Object.keys(COLOR)),
  }
}

const Template = ({ ...restProps }, { argTypes }) => ({
  props: {
    args: { default: () => ({ restProps }) },
    events: { default: () => argEvents(argTypes) }
  },
  components: { VIcon },
  template: `
    <v-icon v-bind="args.restProps" v-on="events"></v-icon>
  `
})

export const Default = Template.bind({})
Default.args = {
  filename: 'headphones',
  color: 'primary',
}
