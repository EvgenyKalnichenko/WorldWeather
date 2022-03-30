<template>
  <span>{{formattedDate}}</span>
</template>

<script>
import moment from 'moment'

export default {
  name: 'v-time',
  props: {
    date: {
      type: Number
    }
  },
  data () {
    return {
      timeOut: null,
      formattedDate: null,
      startTime: this.date
    }
  },
  methods: {
    generatedDate (time) {
      this.formattedDate = moment(time).fromNow()
      this.timeOut = setInterval(() => {
        this.formattedDate = moment(time).fromNow()
      }, 1000 * 60)
      console.log('форматирую дату', this.formattedDate)
    }
  },
  mounted () {
    this.generatedDate(this.startTime)
  },
  unmounted () {
    clearTimeout(this.timeOut)
  },
  watch: {
    'date' () {
      clearTimeout(this.timeOut)
      this.generatedDate(this.date)
    }
  }
}
</script>

<style scoped>

</style>
