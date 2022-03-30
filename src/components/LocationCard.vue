<template>
  <div v-if="!error" class="weather-card">
    <!--    <v-loader v-if="loading"/>-->
    <div class="weather-card__title">
      <div v-if="loading" class="plug"></div>
      {{ name }}
    </div>
    <div class="weather-card__location">Your current location</div>
    <div class="weather-card__list">
      <div class="weather-card__row">
        <span>Weather</span>
        <span v-if="loading" class="plug"></span>
        <span v-else>{{ weather }}</span>
      </div>
      <div class="weather-card__row">
        <span>Temperature</span>
        <span v-if="loading" class="plug"></span>
        <span v-else>{{ temp }} К</span>
      </div>
      <div class="weather-card__row">
        <span>Humidity</span>
        <span v-if="loading" class="plug"></span>
        <span v-else>{{ humidity }} %</span>
      </div>
    </div>
    <div class="weather-card__date">
      <span v-if="loading" class="plug"></span>
      <VTime v-if="time" :date="time"/>
    </div>
    <div class="weather-card__panel">
      <a href="#" class="btn" @click.prevent="reload">Reload</a>
    </div>
  </div>
  <div v-else class="weather-card">
    <p class="text-center">{{error}}</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
// import VLoader from '@/components/app/v-loader'
import VTime from '@/components/app/v-time'

export default {
  name: 'LocationCard',
  components: {
    // VLoader,
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
      loading: '',
      time: '',
      geoInit: null,
      error: ''
    }
  },
  mounted () {
    const promise = new Promise((resolve, reject) => {
      this.loading = true
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const options = {
            lat: position.coords.latitude,
            lon: position.coords.longitude
          }
          resolve(options)
        }, function (error) {
          // если ошибка (можно проверить код ошибки)
          console.log('геолокация недоступна')
          resolve(error)
          // if (error.PERMISSION_DENIED) {
          //   alert('you denied me!')
          // }
        })
    })

    promise.then((value) => {
      if (value.lat && value.lon) {
        this.fetchingData(value)
        this.lat = value.lat
        this.lon = value.lon
      } else {
        this.error = value.message
      }
    }).catch((error) => {
      console.log(error)
      this.error = error
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
      this.loading = false
    },
    reload () {
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

.plug {
  display: inline-block;
  height: 1em;
  width: 80px;
  background: #767676;
  opacity: 0.2;
  border-radius: 4px;
}
</style>
