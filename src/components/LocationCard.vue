<template>
  <div class="weather-card">
    <v-loader v-if="loading"/>
    <div class="weather-card__title">{{ name }}</div>
    <div class="weather-card__country">Your current location</div>
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
      <VTime :date="time" />
    </div>
    <div class="weather-card__panel">
      <a href="#" class="btn" @click.prevent="reload">Reload</a>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import VLoader from '@/components/app/v-loader'
import VTime from '@/components/app/v-time'

export default {
  name: 'LocationCard',
  components: {
    VLoader,
    VTime
  },
  data () {
    return {
      name: '',
      country: '',
      weather: '',
      temp: '',
      humidity: '',
      lat: '',
      lon: '',
      loading: false,
      time: ''
    }
  },
  mounted () {
    const promise = new Promise((resolve, reject) => {
      this.loading = true
      navigator.geolocation.getCurrentPosition(function (position) {
        const options = {
          lat: position.coords.latitude,
          lon: position.coords.longitude
        }
        resolve(options)
      })
    })

    promise.then((value) => {
      this.fetchingData(value)
      this.loading = false
      this.lat = value.lat
      this.lon = value.lon
    }).catch((error) => {
      console.log(error)
      this.loading = false
    })
  },
  methods: {
    ...mapActions(['getWeatherLocation']),
    ...mapActions(['removeWeatherData']),
    async fetchingData (value) {
      const result = await this.getWeatherLocation(value)
      this.name = result.name
      this.country = result.sys.country
      this.weather = result.weather[0].main
      this.temp = result.main.temp
      this.humidity = result.main.humidity
      this.time = +new Date()
    },
    reload () {
      console.log('reload')
      const options = {
        lat: this.lat,
        lon: this.lon
      }
      this.fetchingData(options)
    }
  }
}
</script>

<style scoped>
.weather-card__panel {
  margin-left: auto;
}
</style>
