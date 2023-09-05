<template>
  <v-row class="box mb-8">
    <v-card elevation="4" shaped class="pa-4" style="display: flex; flex-wrap: wrap; width: 100%;">
      <v-col v-for="status in statuses" :key="status.id" :cols="12 / statuses.length">
        <v-row style="margin-top: 0px">
          <v-col cols="4" >
            <v-img :src="status.imageFile" ></v-img>
          </v-col>
          <v-col cols="8" style="padding-left: 0px">
            <div>{{ itemCount[status.name] !== undefined ? itemCount[status.name] : 0 }}</div>
            <div>{{ status.label }}</div>
          </v-col>
        </v-row>
      </v-col>
    </v-card>
  </v-row>
</template>

<script>
export default {
  props: ['itemCount','statuses'],
  // data() {
  //   return {
  //   }
  // },
  methods: {

    getStatus(status_id) {
      return this.statuses.find(status => status.id === status_id)
    },
  }
}
</script>
