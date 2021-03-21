import base, { filename } from 'paths.macro'
import { argEvents, dirnameTitle } from '@/.storybook/utils'
import VTag from '@/components/base/VTag.vue'

export default {
  title: dirnameTitle(base, filename),
  component: VTag,
  argTypes: {
    'v-model': {
      type: 'boolean'
    },
  }
}

const Template = ({ 'v-model': model, slot, ...restProps }, { argTypes }) => ({
  props: {
    args: { default: () => ({ model, slot, restProps }) },
    events: { default: () => argEvents(argTypes) }
  },
  components: { VTag },
  template: `
    <v-tag v-model="args.model" v-bind="args.restProps" v-on="events">{{args.slot}}</v-tag>
  `
})

export const Default = Template.bind({})
Default.args = {
  slot: 'Tag',
  'v-model': true
}

export const StringVModel = () => ({
  data: () => ({
    model: '1'
  }),
  template: `
    <div>
      <v-tag id="1" v-model="model">1</v-tag>
      <v-tag id="2" v-model="model">2</v-tag>
      <v-tag id="3" v-model="model">3</v-tag>
      model: {{ model }}
    </div>
  `
})

export const ArrayVModel = () => ({
  data: () => ({
    model: ['1']
  }),
  template: `
    <div>
      <v-tag id="1" v-model="model">1</v-tag>
      <v-tag id="2" v-model="model">2</v-tag>
      <v-tag id="3" v-model="model">3</v-tag>
      model: {{ model }}
    </div>
  `
})
