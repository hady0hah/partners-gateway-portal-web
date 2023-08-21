<template>

  <div class="container" >

    <v-row class="mt-4">
      <icon-base icon-name="how-to-guides"><icon-guide /></icon-base> <p style="margin-left: 10px">How To Guides</p>
    </v-row>

    <div class="box">
      <div class="box-container" >
        <div class="inner-box" v-for="(box, index) in response.guides" :key="index" ><a @click="viewFile(box)">{{box.name}}</a></div>
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
  },


  data() {
    return {
      response: {
        guides: [
          {
          name: 'Deal Registration'
        },
          {
            name: 'Marketing Development Fund (MDF) '
          },
          {
            name: 'Deal Registration'
          },
          {
            name: 'Product Order (PO)'
          },
          {
            name: 'Product Order (PO)'
          },
          {
            name: 'Product Order (PO)'
          },
          {
            name: 'Test 2'
          },
          {
            name: 'Test 2'
          },
          {
            name: 'Test 2'
          },
          {
            name: 'Marketing Development Fund (MDF)'
          },
          {
            name: 'Marketing Development Fund (MDF)'
          },
          {
            name: 'Deal Registration'
          },
          {
            name: 'Test 2'
          },
          {
            name: 'Deal Registration'
          },
          {
            name: 'Test 2'
          },
          {
            name: 'Test 2'
          },
          {
            name: 'Test 2'
          },
          {
            name: 'Test 2'
          },
          {
            name: 'Test 2'
          },
          {
            name: 'Test 2'
          },
          {
            name: 'Test 2'
          },
          {
            name: 'Test 2'
          },
          {
            name: 'Test 2'
          }
        ]
      }
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
