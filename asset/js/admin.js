import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js'
import pagination from './components/pagination.js'
// import productModalcomponent from './components/productModal.js'

let productModal = null
let delproductModal = null
const app = createApp({
  components: {
    pagination
  },
  data () {
    return {
      tempProduct: {},
      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      apiPath: 'clothes',
      isNew: false,
      products: [],
      pagination: {}
    }
  },
  methods: {
    openModal (type, product) {
      if (type === 'new') {
        this.isNew = true
        productModal.show()
        this.tempProduct = {}
      } else if (type === 'del') {
        this.isNew = false
        delproductModal.show()
        this.tempProduct = { ...product }
      } else if (type === 'edit') {
        this.isNew = false
        this.tempProduct = { ...product }
        productModal.show()
      }
    },
    checkLogin () {
      const url = `${this.apiUrl}/api/user/check`
      axios.post(url)
        .then((res) => {
          if (!res.data.success) {
            alert('請重新登入')
            window.location = 'index.html'
          } else {
            this.getData()
          }
        })
        .catch((err) => {
          console.dir(err.data)
          alert('驗證失敗，請重新登入')
          window.location = 'index.html'
        })
    },
    getData (page = 1) {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/products/?page=${page}`
      axios.get(url)
        .then((res) => {
          this.products = res.data.products
          this.pagination = res.data.pagination
        })
        .catch((err) => {
          console.dir(err.data)
        })
    },
    logout () {
      const url = `${this.apiUrl}/logout`
      axios.post(url)
        .then((res) => {
          Cookies.remove('hexToken')
          alert('登出成功')
          window.location = 'index.html'
        }).catch((err) => {
          console.dir(err.data)
        })
    }
  },
  mounted () {
    // 取出 Token
    productModal = new bootstrap.Modal(document.querySelector('#productModal'), { keyboard: false })
    delproductModal = new bootstrap.Modal(document.querySelector('#delProductModal'), { keyboard: false })
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    axios.defaults.headers.common.Authorization = token
    this.checkLogin()
  }
})
app.component('productModal', {
  props: ['tempProduct', 'isNew'],
  template: '#templateproductModal',
  data () {
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      apiPath: 'clothes',
      product: this.tempProduct
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
      this.product.imagesUrl = []
      this.product.imagesUrl.push('')
    }
  }
})
app.component('delproductModal', {
  props: ['tempProduct', 'isNew'],
  template: '#templatedelProductModal',
  data () {
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      apiPath: 'clothes'
    }
  },
  methods: {
    delProduct () {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`
      axios.delete(url)
        .then(res => {
          this.$emit('get-products')
          delproductModal.hide()
          alert(res.data.message)
        }).catch(err => {
          console.dir(err)
        })
    },
    closeModal () {
      delproductModal.hide()
    }
  }
})

app.mount('#app')
