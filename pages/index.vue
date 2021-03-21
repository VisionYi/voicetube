<template>
  <div class="container my-10">
    <div class="filter">
      <div class="filter__item">
        <div class="filter__label">
          排序
        </div>
        <div v-for="type in sortTypes" :key="type.id" class="filter__tag">
          <v-tag :id="type.id" v-model="selectedSortType">
            {{ type.name }}
          </v-tag>
        </div>
      </div>
      <div class="filter__item">
        <div class="filter__label">
          長度
        </div>
        <div v-for="type in drationTypes" :key="type.id" class="filter__tag">
          <v-tag :id="type.id" v-model="selectedDrationType">
            {{ type.name }}
          </v-tag>
        </div>
      </div>
      <div class="filter__item">
        <div class="filter__label mr-3">
          發布時間
        </div>
        <v-tag v-model="disableDateRange" class="mr-2" @change="onChangeDisableDateRange">
          不限
        </v-tag>
        <date-picker v-model="dateRange" is-range @input="onChangeDateRange">
          <template #default="{ inputValue, inputEvents }">
            <div class="flex g-align-middle">
              <input :value="inputValue.start" class="input" placeholder="Start" v-on="inputEvents.start">
              <span class="mx-1">-></span>
              <input :value="inputValue.end" class="input" placeholder="End" v-on="inputEvents.end">
            </div>
          </template>
        </date-picker>
      </div>
    </div>
    <div class="filter__divide" />

    <div class="g-row g-gap-5">
      <div
        v-for="video in filter(videos, {sortType: selectedSortType, drationType: selectedDrationType, dateRange})"
        :key="video.id"
        class="g-col-12 g-col-md-6 g-col-lg-4 g-col-xl-3"
      >
        <video-card
          :title="video.title"
          :time="video.durationTime"
          :views="video.views"
          :image="video.thumbnail"
          :level="video.levelText"
          :lang="video.langText"
        />
      </div>
      <div v-if="filter(videos, {sortType: selectedSortType, drationType: selectedDrationType, dateRange }).length === 0" class="empty">
        沒有篩選結果
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import DatePicker from 'v-calendar/lib/components/date-picker.umd'
import VideoCard from '~/components/VideoCard.vue'
import { CAPTION, DURATION_TYPE, LEVEL, SORT_TYPE } from '~/utils/mapping'

Vue.component('DatePicker', DatePicker)

const restDateRange = (setEmpty = false) => {
  const now = new Date()
  return setEmpty
    ? {
        start: null,
        end: null,
      }
    : {
        start: new Date(2021, 0, 1),
        end: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
      }
}

export default {
  name: 'Index',
  components: { VideoCard, DatePicker },
  data () {
    return {
      dateRange: restDateRange(true),
      videos: [
        {
          id: 0,
          thumbnail: '',
          title: '',
          views: 0,
          collectCount: 0,
          duration: 0,
          durationTime: '00:00',
          publishedAt: '2021-02-04T16:00:00+00:00',
          level: 1,
          captions: [],
          levelText: '',
          langText: ''
        }
      ],
      sortTypes: [
        {
          id: SORT_TYPE.publishTime,
          name: '發佈時間',
        },
        {
          id: SORT_TYPE.views,
          name: '觀看次數',
        },
        {
          id: SORT_TYPE.collectCount,
          name: '收藏次數',
        },
      ],
      drationTypes: [
        {
          id: DURATION_TYPE.unlimited,
          name: '不限',
        },
        {
          id: DURATION_TYPE.underFour,
          name: '4 分鐘以下',
        },
        {
          id: DURATION_TYPE.fiveToTen,
          name: '5 - 10 分鐘',
        },
        {
          id: DURATION_TYPE.overTen,
          name: '超過 10 分鐘',
        },
      ],
      selectedSortType: SORT_TYPE.publishTime,
      selectedDrationType: DURATION_TYPE.unlimited,
      disableDateRange: true,
      isLaoding: false,
    }
  },
  async fetch () {
    const { data } = await this.$api.getVideoList()
    this.videos = data.map((item) => {
      const [hh, mm, ss] = [
        parseInt(item.duration / 3600),
        parseInt(item.duration / 60) % 60,
        item.duration % 60,
      ]
      const toSting = time => (time ? String(time).padStart(2, '0') : '')

      return {
        ...item,
        durationTime: `${toSting(hh)}${hh ? ':' : ''}${toSting(mm)}:${toSting(ss)}`,
        levelText: LEVEL[item.level],
        langText: item.captions[0] ? CAPTION[item.captions[0]] : '',
      }
    })
  },
  methods: {
    onChangeDisableDateRange ($event) {
      if ($event) {
        this.dateRange = restDateRange(true)
      } else {
        this.dateRange = restDateRange()
      }
    },
    onChangeDateRange () {
      this.disableDateRange = false
    },
    filter (videos, { sortType = SORT_TYPE.publishTime, drationType = DURATION_TYPE.unlimited, dateRange }) {
      let filterVideos = videos.filter((video) => {
        switch (drationType) {
          case DURATION_TYPE.unlimited:
            return video.duration > 0
          case DURATION_TYPE.underFour:
            return video.duration < 5 * 60
          case DURATION_TYPE.fiveToTen:
            return video.duration >= 5 * 60 && video.duration < 10 * 60
          case DURATION_TYPE.overTen:
            return video.duration >= 10 * 60
          default:
            return true
        }
      })

      if (dateRange.start && dateRange.end) {
        filterVideos = filterVideos.filter((video) => {
          const publishDateTime = new Date(video.publishedAt).getTime()
          const [startDateTime, endDateTime] = [new Date(dateRange.start).getTime(), new Date(dateRange.end).getTime()]
          return publishDateTime >= startDateTime && publishDateTime <= endDateTime
        })
      }

      if (filterVideos.length < 2) return filterVideos

      filterVideos.sort((a, b) => {
        switch (sortType) {
          case SORT_TYPE.publishTime:
            return (new Date(a.publishedAt)).getTime() < new Date(a.publishedAt).getTime() ? 1 : -1
          case SORT_TYPE.views:
            return a.views > b.views ? 1 : -1
          case SORT_TYPE.collectCount:
            return a.collectCount > b.collectCount ? 1 : -1
          default:
            return 0
        }
      })

      return filterVideos
    }
  }
}
</script>

<style lang="scss" scoped>
.filter {
  display: flex;
  flex-wrap: wrap;

  &__item {
    display: flex;
    align-items: center;
    margin-bottom: 6px;

    &:not(:last-child) {
      margin-right: 40px;
    }

    @include media-area('lg-down') {
      &:not(:last-child) {
        margin-right: 0;
      }
    }
  }

  &__tag {
    &:not(:last-child) {
      margin-right: 8px;
    }
  }

  &__label {
    margin-right: 24px;
    font-weight: bold;

    @include media-area('md-down') {
      margin-right: 12px;
    }
  }

  &__divide {
    display: block;
    width: calc(100% + 12px);
    height: 1px;
    margin: 0 -6px;
    background-color: $gray-300;
    margin-bottom: 32px;
  }
}

.empty {
  width: 100%;
  font-weight: bold;
  margin: 20px;
  text-align: center;
}

.input {
  display: inline-block;
  border: 1px solid $gray-500;
  padding: 2px 4px;
  width: 88px;
  border-radius: 4px;

  &:hover {
    outline: none;
  }
}
</style>
