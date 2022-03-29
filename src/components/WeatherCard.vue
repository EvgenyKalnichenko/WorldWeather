<template>
  <div class="weather-card">
    <div class="weather-card__title">{{ name }}</div>
    <div class="weather-card__country">{{ country }}</div>
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
    <div class="weather-card__date">5 minutes ago</div>
    <div class="weather-card__panel">
      <a href="#" class="btn" @click.prevent="remove">Remove</a>
      <a href="#" class="btn" @click.prevent="reload">Reload</a>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'WeatherCard',
  props: {
    value: {
      type: Object
    }
  },
  data () {
    return {
      name: this.value.name,
      country: this.value.sys.country,
      weather: this.value.weather[0].main,
      temp: this.value.main.temp,
      humidity: this.value.main.humidity
    }
  },
  methods: {
    ...mapActions(['removeWeatherData']),
    reload () {
      console.log('reload')
    },
    remove () {
      this.removeWeatherData(this.name)
    }
  }
}
</script>

<style scoped>

</style>
