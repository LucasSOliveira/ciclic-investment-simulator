<template>
    <section class="row flex flex-wrap justify-center align-center h-full ">
      <div class="home-content p-2 mx-2 ">
        <div v-if="hasAmount">
          <h3 class="result-body">
            {{
            `Olá ${name}, juntando ${convertMoney(investment)} todo mês, você terá ${convertMoney(amount)} em ${timeFormat(years)}`
            }}
          </h3>
          <div class="home-footer mx-1 mt-2">
            <SimulatorButton
              :disabled="loading"
              @click="clear()"
              secondary class="mx-1">
              Refazer
            </SimulatorButton>
        </div>
      </div>
      <form
      @submit.prevent="getSimulation()"
      v-else
      class="align-center flex flex-wrap justify-center">
        <div class="text-center">
          <h1 class="ciclic-title">Ciclic</h1>
          <h2 class="simulator-title inline-block">Simulador de Investimentos</h2>
        </div>
        <SimulatorInput
          type='text'
          label= 'Nome'
          required
          :mask="'N'.repeat(30)"
          v-model="name"
          :disabled="loading"
          placeholder='Lucas Oliveira'
          class="w-full mt-2"
          name="simulator-name"/>
        <SimulatorInput
          isMoney
          :disabled="loading"
          v-model="investment"
          type="tel"
          label="Mensalidade"
          name="simulator-investiment"
          class="w-full mt-2"/>
        <SimulatorInput
          required
          v-model="years"
          :disabled="loading"
          mask='####'
          type="tel"
          label="Tempo (Em Anos)"
          placeholder='3'
          name="simulator-investiment"
          class="w-full mt-2"/>
        <div class="home-footer mx-1 mt-2">
          <SimulatorButton
            :disabled="loading"
            @click="clear()"
            secondary class="mx-1">
              Limpar
          </SimulatorButton>
          <SimulatorButton
            :loading="loading"
            type="submit"
            class="mx-1">
              Simular
          </SimulatorButton>
        </div>
      </form>
      </div>
    </section>
</template>

<script>
import api from '@/router/axios'
import currencyFormat from '@/assets/utils'

export default {
  name: 'Home',
  components: {
    SimulatorInput: () => import('@/components/SimulatorInput'),
    SimulatorButton: () => import('@/components/SimulatorButton'),
  },
  computed: {
    hasAmount() {
      return !!this.amount
    },
  },
  data() {
    return {
      disabled: false,
      loading: false,
      name: '',
      investment: '',
      years: '',
      amount: '',
    }
  },
  methods: {
    clear() {
      this.name = ''
      this.investment = ''
      this.years = ''
      this.amount = ''
    },
    convertMoney(value) {
      return currencyFormat(`${value}`)
    },
    timeFormat(value) {
      return value == 1 ? '1 Ano' : `${value} anos`
    },
    getSimulation() {
      const payload = { expr: `${this.investment} * (((1 + 0.00517) ^ ${12 * this.years} - 1) / 0.00517)` }

      this.loading = true
      this.amount = ''
      return api.post('/V4/', payload)
      .then(({ data }) => {
        this.amount = data?.result
      })
      .catch((error) => { console.log(error) })
      .finally(() => {
        this.loading = false
      })
    },
  },
}
</script>

<style lang="scss">
.home-content {
  border-radius: $border-radius-normal;
  background: $color-ui-white;
  vertical-align: middle;
  max-width: 970px;
}
.result-body {
  font-family: $font-family-02;
  font-size: 2rem;
}
.simulator-title {
  font-family: $font-family-02;
}
</style>
