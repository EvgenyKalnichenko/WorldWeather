<template>
  <div class="weather-card">
    <div class="weather-card__title">{{ name }}</div>
    <div class="weather-card__location">{{ country }}</div>
    <div class="weather-card__list">
      <div class="weather-card__row">
        <span>Weather</span><span>{{ weather }}</span>
      </div>
      <div class="weather-card__row">
        <span>Temperature</span><span>{{ temp }} °C</span>
      </div>
      <div class="weather-card__row">
        <span>Humidity</span><span>{{ humidity }} %</span>
      </div>
    </div>
    <div class="weather-card__date">
      <VTime :date="time"/>
    </div>
    <div class="weather-card__panel">
      <a href="#" class="btn" @click.prevent="remove">Remove</a>
      <a href="#" class="btn" @click.prevent="reload">Reload</a>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import VTime from '@/components/app/v-time'

export default {
  name: 'WeatherCard',
  props: {
    value: {
      type: Object
    }
  },
  components: {
    VTime
  },
  data () {
    return {
      name: this.value.name,
      country: this.value.sys.country,
      weather: this.value.weather[0].main,
      temp: this.value.main.temp,
      humidity: this.value.main.humidity,
      time: this.value.time
    }
  },
  methods: {
    ...mapActions(['removeWeatherData']),
    ...mapActions(['getWeatherData']),
    reload () {
      console.log('reload')
      this.getWeatherData({
        city: this.name
      })
    },
    remove () {
      this.removeWeatherData(this.name)
    }
  },
  watch: {
    'value' () {
      this.name = this.value.name
      this.country = this.value.sys.country
      this.weather = this.value.weather[0].main
      this.temp = this.value.main.temp
      this.humidity = this.value.main.humidity
      this.time = this.value.time
    }
  }
}
</script>

<style scoped>

</style>
