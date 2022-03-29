export default {
  state: {
    cities: [
      {
        coord: {
          lon: 45.0046,
          lat: 53.2007
        },
        weather: [{
          id: 803,
          main: 'Clouds',
          description: 'broken clouds',
          icon: '04d'
        }],
        base: 'stations',
        main: {
          temp: 2,
          feels_like: -2.57,
          temp_min: 2,
          temp_max: 2,
          pressure: 1000,
          humidity: 98,
          sea_level: 1000,
          grnd_level: 982
        },
        visibility: 621,
        wind: {
          speed: 5.29,
          deg: 250,
          gust: 12.7
        },
        clouds: {
          all: 75
        },
        dt: 1648545506,
        sys: {
          country: 'RU',
          sunrise: 1648521684,
          sunset: 1648567681
        },
        timezone: 10800,
        id: 511565,
        name: 'Penza',
        cod: 200
      }
    ]
  },
  mutations: {
    SET_CITY (state, data) {
      state.cities.push(data)
    },
    REMOVE_CITY (state, city) {
      state.cities = state.cities.filter(el => el.name !== city)
    }
  },
  actions: {
    async getWeatherData (context, { city }) {
      try {
        const key = '1049d47c1f681e1591ae1134008c4dd0'
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?units=metric&lang=en&APPID=${key}&q=${city}`)

        if (response.ok) {
          const json = await response.json()
          console.log(json)
          if (context.state.cities.find(el => el.name === city)) {
            console.log('город уже есть в списке')
          }
          context.commit('SET_CITY', json)
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
      console.log(options)
      try {
        const key = '1049d47c1f681e1591ae1134008c4dd0'
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${options.lat}&lon=${options.lon}&appid=${key}`)

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
      console.log(city)
      // const weatherList = Array.from(context.state.cities).filter(el => el.name !== city)
      context.commit('REMOVE_CITY', city)
    }
  },
  getters: {
    cities: s => s.cities
  }
}
