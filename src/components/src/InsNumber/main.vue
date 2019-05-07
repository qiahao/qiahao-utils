<template>
  <div class="ins-number ins-flex">
    <ins-icon
      @click.native="onClickMinus"
      icon="minus"
    ></ins-icon>
    <div class="ins-flex__1">
      <div class="ins-number__content">
        <input
          @blur="onBlur"
          class="ins-number__input"
          v-model="num"
        />
      </div>
    </div>
    <ins-icon
      @click.native="onClickPlus"
      icon="plus"
    ></ins-icon>
  </div>
</template>

<script>
import InsIcon from '../InsIcon';
export default {
  name: 'InsNumber',
  props: {
    value: {
      type: [String, Number],
      default: 0
    },
    max: {
      type: Number,
      default: 999999
    },
    min: {
      type: Number,
      default: 0
    },
    integer: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {};
  },
  components: {
    InsIcon
  },
  computed: {
    num: {
      get() {
        return this.value + '';
      },
      set(val) {
        let num = val;
        if (Number.isNaN(Number(val))) {
          num = 0;
        }
        this.$emit('input', num);
      }
    }
  },
  watch: {},
  methods: {
    onClickMinus() {
      let num = Number(this.num);
      if (Number.isNaN(num)) {
        num = -1;
      } else {
        --num;
      }
      this.num = this.validateInteger(num < this.min ? this.min : num);
    },
    onClickPlus() {
      let num = Number(this.num);
      if (Number.isNaN(num)) {
        num = 0;
      } else {
        ++num;
      }
      this.num = this.validateInteger(num > this.max ? this.max : num);
    },
    onBlur(e) {
      let num = Number(e.target.value);
      if (Number.isNaN(num) || num < this.min) {
        num = this.min;
      } else if (num > this.max) {
        num = this.max;
      }
      e.target.value = num + '';
    },
    validateInteger(num) {
      if (this.integer) {
        parseInt(num);
      }
      return num;
    }
  },
  created() {},
  mounted() {}
};
</script>

<style lang="scss">
@include b(number) {
  $w: 128px;
  $h: 40px;
  display: inline-block;
  box-sizing: border-box;
  width: $w + 2;
  height: $h + 2;
  border: 1px solid $--border-color-base;
  background-color: $--background-color-white;
  vertical-align: middle;
  line-height: $h;
  @include e(content) {
    position: relative;
    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 3px;
      bottom: 3px;
      width: 0;
      border-right: 1px solid $--border-color-base;
    }
    &::before {
      left: 0;
    }
    &::after {
      right: 0;
    }
  }
  @include e(input) {
    width: 100%;
    height: $h;
    line-height: $h;
    padding: 0;
    text-align: center;
    vertical-align: top;
    outline: none;
    border: none;
  }
  .ins-icon {
    position: relative;
    display: inline-block;
    width: $h;
    height: $h;
    text-align: center;
    font-size: $--font-size-md;
    &:active {
      opacity: 0.9;
    }
  }
}
</style>
