/* global productModal */
export default {
  props: ['tempProduct', 'isNew'],
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
          console.log(res)
          this.$emit('get-products')
          productModal.hide()
          alert(res.data.message)
        }).catch(err => {
          console.dir(err)
        })
    },
    closeModal () {
      productModal.hide()
    },
    createImagesUrl () {
      this.tempProduct.imagesUrl = []
      this.tempProduct.imagesUrl.push('')
    }
  },
  mounted () {
    const productModal = new bootstrap.Modal(document.getElementById('productModal'), {
      keyboard: false,
      backdrop: 'static'
    })
  }
}
