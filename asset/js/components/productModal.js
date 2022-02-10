export default {
  props: ['tempProduct', 'isNew', 'currentPage'],
  template: '#templateproductModal',
  data () {
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      apiPath: 'clothes'
    }
  },
  methods: {
    updateProduct () {
      let url = `${this.apiUrl}/api/${this.apiPath}/admin/product/`
      let method = 'post'
      if (!this.isNew) {
        url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`
        method = 'put'
      }
      axios[method](url, { data: this.tempProduct })
        .then(res => {
          // this.getData()
          this.$emit('get-products', method === 'put' ? this.currentPage : 1)
          this.closeModal()
          alert(res.data.message)
        }).catch(err => {
          console.dir(err)
        })
    },
    closeModal () {
      this.$emit('close-modal')
    },
    createImagesUrl () {
      this.$emit('create-imagesurl')
    }
  }
}
