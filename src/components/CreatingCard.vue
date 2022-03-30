<template>
  <div @click="show = true" class="btn-circle">
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="white"
            fill-opacity="0.87"/>
    </svg>
  </div>
  <custom-modal v-model="show" @clear="clear" @add="add" @cancel="cancel">
    <template v-slot:title>Choose a city</template>
    <div class="text-grey">
      <p>To find city start typing and pick one from the suggestions</p>
    </div>
    <div class="modal__input">
      <div :class="{ error: v$.city.$errors.length }">
        <div class="form-group">
          <input
            ref="input"
            @input="mask"
            class="form-group__input"
            type="text" v-model="city"
            placeholder="Search city">
        </div>
        <div class="input-errors" v-for="error of v$.city.$errors" :key="error.$uid">
          <div class="error-msg">{{ error.$message }}</div>
        </div>
      </div>
    </div>
  </custom-modal>
</template>

<script>
import CustomModal from '@/components/CustomModal'
import { mapActions } from 'vuex'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
  name: 'CreatingCard',
  components: { CustomModal },
  setup () {
    return { v$: useVuelidate() }
  },
  validations () {
    return {
      city: { required } // Matches this.firstName
    }
  },
  data () {
    return {
      show: false,
      city: ''
    }
  },
  methods: {
    ...mapActions(['getWeatherData']),
    ...mapActions(['removeWeatherData']),
    confirm () {
      // some code...
      this.show = false
    },
    clear () {
      this.city = ''
    },
    cancel (close) {
      this.removeWeatherData(this.city)
    },
    async add () {
      const options = {
        city: this.city
      }
      this.getWeatherData(options)
      this.show = false
    },
    mask () {
      this.city = this.city.replace(/[^A-Za-z]/g, '')
    }
  },
  watch: {
    'show' () {
      if (this.show) {
        setTimeout(() => {
          this.$refs.input.focus()
        }, 600)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.btn-circle {
  position: fixed;
  bottom: 40px;
  right: 40px;
  @media (max-width: 768px) {
    bottom: 20px;
    right: 20px;
  }
}

.text-grey {
  font-weight: 400;
  font-size: 24px;
  line-height: 24px;
  margin-bottom: 70px;
  color: #767676;
  @media (max-width: 768px) {
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 24px;
  }
}

.modal__input {
  margin-bottom: 120px;
}
</style>
