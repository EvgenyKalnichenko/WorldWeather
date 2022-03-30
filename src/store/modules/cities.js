import { writeToLocalStore } from '@/assets/js/utils'

export default {
  state: {
    cities: []
  },
  mutations: {
    SET_CITY (state, data) {
      state.cities.push(data)
      writeToLocalStore(state.cities)
    },
    RELOAD_WEATHER (state, data) {
      state.cities[data.index] = data.weather
      writeToLocalStore(state.cities)
    },
    REMOVE_CITY (state, city) {
      state.cities = state.cities.filter(el => el.name !== city)
      writeToLocalStore(state.cities)
    },
    SET_CITIES (state, cities) {
      state.cities = cities
    }
  },
  actions: {
    async getWeatherData (context, { city }) {
      try {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?units=metric&lang=en&APPID=${process.env.VUE_APP_KEY_API}&q=${city}`)

        if (response.ok) {
          const json = await response.json()
          const index = context.state.cities.findIndex(el => el.name.toUpperCase() === city.toUpperCase())
          const time = +new Date()
          json.time = time
          if (index >= 0) {
            context.commit('RELOAD_WEATHER', {
              weather: json,
              index
            })
            console.log('город уже есть в списке')
          } else {
            context.commit('SET_CITY', json)
          }
        } else {
          alert('Ошибка HTTP: ' + response.status)
        }
      } catch (e) {
        console.log(e)
        // store.commit('setError', e)
        throw e
      }
    },
    async getWeatherLocation (context, options) {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${options.lat}&lon=${options.lon}&appid=${process.env.VUE_APP_KEY_API}`)

        if (response.ok) {
          const json = await response.json()
          return json
        } else {
          alert('Ошибка HTTP: ' + response.status)
        }
      } catch (e) {
        console.log(e)
        // store.commit('setError', e)
        throw e
      }
      return false
    },
    async removeWeatherData (context, city) {
      context.commit('REMOVE_CITY', city)
    },
    localStorageData (context) {
      const data = JSON.parse(localStorage.getItem('cities'))
      if (data) {
        context.commit('SET_CITIES', data)
      }
    }
  },
  getters: {
    cities: s => s.cities
  }
}
