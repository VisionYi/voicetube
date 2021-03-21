import base, { filename } from 'paths.macro'
import { argEvents, dirnameTitle } from '@/.storybook/utils'
import VideoCard from '@/components/VideoCard.vue'

export default {
  title: dirnameTitle(base, filename),
  component: VideoCard,
}

const Template = ({ ...restProps }, { argTypes }) => ({
  props: {
    args: { default: () => ({ restProps }) },
    events: { default: () => argEvents(argTypes) }
  },
  components: { VideoCard },
  template: `
    <video-card style="width: 50%;" v-bind="args.restProps" v-on="events"></video-card>
  `
})

export const Default = Template.bind({})
Default.args = {
  title: 'Quisquam voluptatem quaerat sed est.',
  time: '10:10',
  views: 1212,
  image: 'https://fakeimg.pl/250x200',
  level: '中級',
  lang: '中文',
}
