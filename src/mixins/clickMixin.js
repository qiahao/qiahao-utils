export default {
  props: {
    activedClass: {
      type: String,
      default: 'is-actived'
    },
    activedEffect: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    interval: {
      type: Number,
      default: 200
    }
  },
  data() {
    return {
      clickTimer: null,
      clickActived: false
    };
  },
  components: {},
  computed: {
    computedActivedClass() {
      return [this.activedEffect && this.clickActived ? this.activedClass : ''];
    }
  },
  watch: {},
  methods: {
    handlerClick(e) {
      if (this.clickActived || this.loading) { return; }
      this.clickActived = true;
      this.$emit('click', e);
      this.clickTimer = setTimeout(() => {
        this.clickActived = false;
      }, this.interval);
    }
  },
  created() { },
  mounted() { },
  beforeDestroy() {
    clearTimeout(this.clickTimer);
  }
};
