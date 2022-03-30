<template>
  <section class="section-weather">
    <h1 class="section-weather__title">World Weather</h1>
    <p class="section-weather__note">Watch weather in your current location</p>
    <div class="section-weather__location">
      <LocationCard />
    </div>
    <div class="section-weather__grid">
      <div
        v-for="city in cities"
        :key="city.id"
        class="section-weather__item"
      >
        <WeatherCard
          :value="city"
        />
      </div>
    </div>
    <CreatingCard />
  </section>
</template>

<script>
// @ is an alias to /src
import WeatherCard from '@/components/WeatherCard.vue'
import CreatingCard from '@/components/CreatingCard.vue'
import LocationCard from '@/components/LocationCard.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'HomeView',
  components: {
    CreatingCard,
    WeatherCard,
    LocationCard
  },
  methods: {
    ...mapActions(['localStorageData'])
  },
  computed: {
    ...mapGetters(['cities'])
  },
  mounted () {
    this.localStorageData()
  }
}
</script>
