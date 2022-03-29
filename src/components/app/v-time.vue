<template>
  <div>
    <span>{{formattedDate}}</span>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'v-time',
  props: {
    date: {
      type: Number,
      default: new Date()
    }
  },
  data () {
    return {}
  },
  mounted () {
    console.log(this.makeCalculate())
  },
  computed: {
    formattedDate () {
      return moment(this.date).fromNow()
    }
  },
  methods: {
    makeCalculate () {
      // return this.$moment(new Date()).format('DD.MM.YYYY')
    }
  }
}
</script>

<style scoped>

</style>
