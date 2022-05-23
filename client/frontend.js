import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.esm.browser.js'

Vue.component('loader', {
  template: `
    <div style='display: flex;justify-content: center; align-items: center'>
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `
})

new Vue({
  el: '#app',
  data() {
    return {
      current: '',
      loading: false,
      form: {
        name: '',
      },
      capitals: [
      ],
    }
  },
  async mounted() {
    this.loading = true
    this.capitals = await request('/capitals')
    this.loading = false
  },
  computed: {
    canCreate() {
      return this.form.name.trim()
    }
  },
  methods: {
    async findCapital() {
      const name = this.form.name;
      const response = await request(`/capital?country=${name}`)
      this.current = response.info
      this.form.name = ''
    }
  }
})

async function request(url, method = 'GET', data = null) {
  try {
    const headers = {}
    let body

    if (data) {
      headers['Content-Type'] = 'application/json',
      body = JSON.stringify(data)
    }

    const response = await fetch(url, {
      method,
      headers,
      body
    })
    return await response.json()
  } catch (e) {
    console.log(e)
  }
}