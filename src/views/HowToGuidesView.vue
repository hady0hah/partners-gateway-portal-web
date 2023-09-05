<template>

  <div class="container" >

    <v-row class="mt-4">
      <icon-base icon-name="how-to-guides"><icon-guide /></icon-base> <p style="margin-left: 10px">How To Guides</p>
    </v-row>

    <div class="box">
      <div class="box-container" >
        <div class="inner-box" v-for="(box, index) in response" :key="index" ><a @click="downloadFile(box)">{{box.label}}</a></div>
      </div>
    </div>

  </div>

</template>

<script>
import IconGuide from "@/components/icons/IconGuide.vue"
import IconBase from "@/components/IconBase.vue"
export default {
  name: 'HowToGuides',

  components: {
    IconBase,
    IconGuide,
  },
  methods: {
    viewFile (document) {
      this.axios.get(document.file, {responseType: 'blob'})
        .then(function (response) {
          window.open(URL.createObjectURL(response.data));
        })
        .catch(err => {
          console.log(err);
        });
    },
      downloadFile (doc) {
        this.axios.get(doc.file, { responseType: 'blob' })
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
  },

  mounted() {
    const t = this
    this.$Progress.start()
    this.axios.get(axios.defaults.endpoints.how_to.url, {})
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
  }
};
</script>

<style >
.box-container{
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 25px;
}
.inner-box {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2%;
  width: 160px;
  height: 160px;
  border: 2px solid rgba(128, 128, 128, 0.25);
  text-align: center;
  font-weight: bold;
}
</style>
