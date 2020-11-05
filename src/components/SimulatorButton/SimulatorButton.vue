<template>
  <button
    :id="id"
    :disabled="isDisabledOrLoading"
    :class="{
      'px-3 rounded h-5 cursor-pointer font-medium relative': true,
      'simulator-button simulator-button--default align-center': true,
      'simulator-button--loading': loading,
      'simulator-button--secondary': secondary,
      'simulator-button--tertiary': tertiary,
      'simulator-button--box': box,
      'simulator-button--text': text,
      'cursor-not-allowed text-opacity-md': isDisabledOrLoading,
      'simulator-button--iconed': icon
    }"
    role="button"
    v-on="listeners">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'SimulatorButton',
  props: {
    id: {
      type: String,
      default: () => null,
    },
    secondary: {
      type: Boolean,
      default: false,
    },
    tertiary: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: Boolean,
      default: false,
    },
    box: {
      type: Boolean,
      default: false,
    },
    text: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        click: this.onClick,
      }
    },
    isDisabledOrLoading() {
      return this.disabled || this.loading
    },
  },
  methods: {
    onClick(event) {
      if (this.disabled || this.loading) { return }
      this.$emit('click', event)
    },
  },
}
</script>

<style lang="scss">
$simulator-button-color: $color-brand-secondary;
$font-size-button: $font-size-paragraph;

$types: (
  default: (
    color: $color-ui-white,
    background: $simulator-button-color
  ),
  secondary: (
    color: $color-brand-secondary,
    background: $color-ui-white,
    border-color: $color-brand-secondary
  ),
  tertiary: (
    color: rgba($color-ui-black, $font-opacity-hg),
    background: $color-ui-white,
    border-color: rgba($color-ui-black, $opacity-low-min)
  ),
  box: (
    color: $simulator-button-color,
    background: none,
    border: 1px solid
  ),
  text: (
    color: $simulator-button-color,
    background: none
  ),
);

.simulator-button {
  border: none;
  font-size: $font-size-button;
  transition-property: background, transform, opacity, color;
  transition-duration: $transition-sm-fast;
  transition-timing-function: $transition-easing-decelerate;
  &:focus {
    outline: none;
  }
  &--default {
    color: $color-ui-white;
    background: $simulator-button-color;
    box-shadow: inset 0 -1px rgba(0,0,0, $opacity-low-half);

    &:enabled {
      &:hover {
        background: lighten($simulator-button-color, 5);
        transition-duration: .06s;
      }
      &:active, &:focus {
        background: darken($simulator-button-color, 5);
      }
    }
  }
  &--secondary,
  &--tertiary,
  &--text {
    box-shadow: none;
  }
  &--secondary, &--tertiary {
    background: $color-ui-white;
    border-width: $border-width-default;
    border-style: solid;
  }
  &--secondary {
    &:enabled {
      &:hover {
        background: rgba($simulator-button-color, $opacity-low-min);
      }
      &:focus, &:active {
        background: rgba($simulator-button-color, $opacity-low-max);
      }
    }
  }
  &--tertiary {
    &:enabled {
      &:hover {
        background: rgba($color-ui-black, $opacity-low-min);
      }
      &:active, &:focus {
        background: rgba($color-ui-black, $opacity-low-half);
      }
    }
  }
  .simulator-icon {
    margin-right: $spacing-margin-xxsmall;
  }
  &--iconed {
    padding: {
      left: $spacing-padding-xxsmall;
      right: $spacing-padding-xxsmall;
    };
    .simulator-icon {
      margin-right: 0;
    }
  }
}

@each $type, $theme in $types {
  @each $config, $value in $theme {
    .simulator-button--#{$type} {
      #{$config}: $value;
      &.simulator-button--loading {
        &::after {
          border-color: map-get($theme, 'color');
        }
      }
    }
  }
}

.simulator-button--loading {
  color: transparent;
  &::after {
    content: '';
    border-width: $border-width-large;
    border-style: solid;
    border-top-color: transparent !important;
    border-bottom-color: transparent !important;
    height: 1rem;
    width: 1rem;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    border-radius: 999px;
    animation: rotateLoading $transition-bounce-slow $transition-easing-default infinite;
  }
}

@keyframes rotateLoading {
  0% {
    transform: translate3d(-50%, -50%, 0) rotate(0);
  }
  100% {
    transform: translate3d(-50%, -50%, 0) rotate(360deg);
  }
}
</style>
