import base, { filename } from 'paths.macro'
import { argEvents, dirnameTitle } from '@/.storybook/utils'
import VImage from '@/components/base/VImage.vue'

export default {
  title: dirnameTitle(base, filename),
  component: VImage,
}

const Template = ({ ...restProps }, { argTypes }) => ({
  props: {
    args: { default: () => ({ restProps }) },
    events: { default: () => argEvents(argTypes) }
  },
  components: { VImage },
  template: `
    <v-image style="width:50%" v-bind="args.restProps" v-on="events"></v-image>
  `
})

export const Default = Template.bind({})
Default.args = {
  src: 'https://fakeimg.pl/250x200',
}
