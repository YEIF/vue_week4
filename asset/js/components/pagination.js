export default {
  props: ['pages'],
  template: '#templatepagination',
  methods: {
    changePages (page) {
      this.$emit('change-pages', page)
    }
  }
}
