<template>

  <div class="container pl-16">

    <v-row class="mt-4">
      <v-col cols="12" style="margin-left: -68px;">
      <icon-base icon-name="how-to-guides" style="min-width: 56px;padding: 0 8px;max-width: 100%;"><icon-product /></icon-base>
      <span  style="color:#035730;">Products/Technical</span>
      </v-col>
    </v-row>

    <v-row v-for="(product, productName) in response" :key="productName" class="base-product-wrapper" >
      <div class="mb-4" >
        <v-col>
          <h3 class="header">{{ productName }}</h3>
        </v-col>
      </div>
      <div class="d-flex">
        <v-col v-for="(section, sectionName) in product" :key="sectionName" class="box pa-8" >
          <v-row class="mb-4" >
            <h3 class="header">{{ sectionName }}</h3>
          </v-row>
          <div class="scrollable-table">
            <v-row v-for="(field, fieldName) in section" :key="fieldName" style="width: 90%;margin-top: 10px;margin-left: 1px;">
              <div style="flex: 0 1 auto" class="section-text">{{ fieldName }}</div><hr class="dotted-line" style="flex: 1 1 auto"><a @click="downloadFile(field)" ><icon-base icon-name="download"><icon-download /></icon-base> </a>
            </v-row>
          </div>

        </v-col>

      </div>

    </v-row>

  </div>

</template>

<script>
import IconProduct from "@/components/icons/IconProduct.vue"
import IconDownload from "@/components/icons/IconDownload.vue"
import IconBase from "@/components/IconBase.vue"
export default {
  name: 'Products_Technical',

  components: {
    IconBase,
    IconProduct,
    IconDownload,
  },
  mounted() {
    const t = this
    this.$Progress.start()
    this.axios.get(axios.defaults.endpoints.products_technical.url, {})
      .then(function (response) {
        t.$Progress.finish()
        t.response = response.data.data
      })
      .catch(err => {
        console.log(err);
      });
  },

  data() {
    return {
      response : [],
    }
  },
  methods: {
    downloadFile (doc) {
      this.axios.get(doc, { responseType: 'blob' })
        .then(response => {
          const blob = new Blob([response.data], { type: 'application/pdf' })
          const link = document.createElement('a')
          link.href = URL.createObjectURL(blob)
          let fileName = response.headers["content-disposition"].split("filename=")[1];
          link.download = fileName;
          link.click()
          URL.revokeObjectURL(link.href)
        }).catch(console.error)
    },
  }
};
</script>

<style >
.header{
  color: #205023;
  margin-top: 15px;
}
.dotted-line {
  border-top: 2px dotted #999;
  margin: 20px;
}
.base-product-wrapper{
  display: flex;
  flex-direction:column;
}

.scrollable-table{
  height: 200px;
  overflow: auto;
  margin-left: 10px;
  /*overflow-y: scroll;*/
}
.section-text{
  color: #205023;
}


.scrollable-table::-webkit-scrollbar {
  width: 6px;
}

.scrollable-table::-webkit-scrollbar-track {
  background: #d0d0d0;
  border: none;
  border-radius: 0;
  margin: 8px 0;
  box-shadow:   0 0 0 1px #d0d0d0;
}
.scrollable-table::-webkit-scrollbar-track-piece {
  background-color: transparent;
  border-left: 10px solid white;
  border-right: 10px solid white;
}

.scrollable-table::-webkit-scrollbar-thumb {
  background: #bdbdbd;
  border-radius: 6px;
}


</style>
