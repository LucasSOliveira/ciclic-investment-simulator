<template>
  <div
    :class="{
      'simulator-input--focus': isFocus,
      'simulator-input--disabled cursor-not-allowed': disabled
    }"
    class="simulator-input__wrapper flex align-start flex-col mx-1">
    <div
      class="flex flex-row w-full shrink-1">
      <money
        v-if="isMoney"
        :disabled="disabled"
        :class="{'cursor-not-allowed': disabled }"
        v-model="price"
        v-bind="money"
        :id="getInputId()"
        class="simulator-input shrink-1 grow-1 rounded"
      />
      <input
        ref="input"
        v-else
        v-bind="$attrs"
        v-mask="config"
        :placeholder="placeholder"
        :id="getInputId()"
        :disabled="disabled"
        :value="currentValue"
        :name="name"
        :required="required"
        :type="type"
        :class="{ 'cursor-not-allowed': disabled }"
        class="simulator-input shrink-1 grow-1 rounded"
        v-on="listeners"
        @input="refresh($event.target.value)"
      />
    </div>
    <label
      v-if="label"
      :for="getInputId()"
      class="simulator-label text-left mb-1-2">
      {{ label }}
    </label>
  </div>
</template>

<script>
import mask from '@/assets/masker/masker.directive'
import masker from '@/assets/masker/masker'
import tokens from '@/assets/masker/tokens'
import { Money } from 'v-money'

export default {
  name: 'SimulatorInput',
  directives: { mask },
  components: {
    Money,
  },
  props: {
    value: {}, // eslint-disable-line
    label: {
      type: String,
      default: () => null,
    },
    placeholder: {
      type: String,
      default: () => null,
    },
    id: {
      type: String,
      default: () => null,
    },
    type: {
      type: String,
      default: 'text',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    mask: {
      type: [ String, Array ],
      required: false,
      default() {
        return 'N'.repeat(240)
      },
    },
    masked: {
      type: Boolean,
      default: false,
    },
    isMoney: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    tokens: {
      type: Object,
      default: () => tokens,
    },
    name: {
      type: String,
      default: '',
    },
    formKey: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      isFocus: false,
      price: this.value,
      currentValue: null,
      lastValue: null,
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        suffix: '',
        precision: 2,
        masked: false,
        maxlength: 16,
      },
    }
  },
  computed: {
    config() {
      return {
        mask: this.mask,
        masked: this.masked,
        tokens: this.tokens,
      }
    },
    listeners() {
      return {
        ...this.$listeners,
        input: this.onInput,
        focus: this.onFocus,
        blur: this.onBlur,
      }
    },
  },
  watch: {
    value(newValue) {
      if (newValue !== this.lastValue) {
        this.refresh(newValue)
      }
      if (this.isMoney) {
        this.price = newValue
      }
    },
    price(value) {
      this.$emit('input', value)
    },
    masked() {
      this.refresh(this.currentValue)
    },
  },
  methods: {
    getInputId() {
      if (this.id) return this.id
      if (this.label) return this.transformID(this.label)

      return this.formKey
    },
    transformID(string) {
      const lowerCaseLabel = string.toLowerCase()

      return `${lowerCaseLabel.replace(/[^a-zA-Z0-9]/g, '')}-${this.formKey}`
    },
    onInput(event) {
      if (this.disabled) return
      this.$emit('input', event.target.value)
    },
    onFocus() {
      if (this.disabled) return

      this.isFocus = true
    },
    onBlur() {
      if (this.disabled) return

      this.isFocus = false
    },
    refresh(value) {
      this.currentValue = value
      const refreshValue = masker(value, this.mask, this.masked, this.tokens)
      if (refreshValue !== this.lastValue) {
        this.lastValue = refreshValue
        this.$emit('input', refreshValue)
      }
    },
  },
}
</script>

<style lang="scss">
$transition-duration: $transition-sm-medium;

.simulator-input {
  transition-property: border-color;
  transition-duration: $transition-duration;
  transition-timing-function: $transition-easing-default;
  &--focus {
    .simulator-label {
      color: $color-brand-primary !important;
    }
  }
  &:not([disabled]) {
    &:focus {
      outline: none;
      border-color: $color-brand-primary;
      + .simulator-label {
        color: $color-brand-primary;
      }
    }
    &:hover {
      border-color: $color-brand-primary;
    }
  }
  &--disabled {
    opacity: 0.6;
  }

  &__wrapper {
    position: relative;
    .mx-input {
      @extend .simulator-input;
      font-size: $font-size-default;
    }
  }
}

.simulator-label {
  font-family: $font-family-01;
  color: $color-ui-gray;
  margin-bottom: $spacing-margin-xxxsmall;
  transition: color $transition-duration $transition-easing-default;
  order: -1;
}

.simulator-feedback {
  font-family: $font-family-01;
  color: $color-ui-gray;
  margin-top: $spacing-margin-xxxsmall;
  align-self: flex-end;
  font-size: $font-size-paragraph;
}

.simulator-input {
  -webkit-appearance: none;
  border: 1px solid rgba($color-ui-gray, 0.56);
  flex-shrink: 1;
  font-family: $font-family-01;
  height: 40px;
  min-width: 24px;
  padding: 0 $spacing-padding-xxsmall;
}

.simulator-input::placeholder {
  font-family: $font-family-01;
  color: #000000;
  font-size: 16px;
  opacity: $opacity-low-max;
}
</style>
