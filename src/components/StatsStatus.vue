<template>
  <v-row class="box mb-8">
    <v-card elevation="4" shaped class="pa-4" style="display: flex; flex-wrap: wrap;width: 100%;">
      <v-row :cols="12 / statuses.length" v-for="status in statuses" :key="status.id" style="margin-top: 0px">
        <v-col cols="3">
          <v-img :src="status.imageFile"></v-img>
        </v-col>
        <v-col cols="9" style="padding-left: 0px">
          <div>{{ itemCount[status.name] !== undefined ? itemCount[status.name] : 0 }}</div>
          <div>{{ status.label }}</div>
        </v-col>
      </v-row>
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
