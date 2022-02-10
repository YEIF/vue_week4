export default {
  props: ['tempProduct', 'isNew', 'currentPage'],
  template: '#templatedelProductModal',
  data () {
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      apiPath: 'clothes'
    }
  },
  methods: {
    delProduct () {
      console.log(this.tempProduct)
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`
      axios.delete(url)
        .then(res => {
          this.$emit('get-products', this.currentPage)
          this.closeModal()
          alert(res.data.message)
        }).catch(err => {
          console.dir(err)
        })
    },
    closeModal () {
      this.$emit('close-modal')
    }
  }
}
