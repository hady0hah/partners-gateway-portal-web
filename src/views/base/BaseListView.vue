<template>
  <div class="container pl-16">
    <slot name="page-header">
      <v-row class="mt-4">
        <v-col cols="12" style="margin-left: -68px;">
          <slot name="icon"><icon-base style="min-width: 56px;padding: 0 8px;">
              <component :is="icon" style="max-width: 100%;"  :color="'#035730'"></component>
            </icon-base></slot>
          <span :title="title" style="color:#035730;">{{ title }}</span>
        </v-col>
        <v-col cols="12" class="pt-1 mb-6">
          <h4 :subtitle="subtitle" style="margin-left: -12px;color:#035730;">{{ subtitle }}</h4>
        </v-col>
      </v-row>
    </slot>
    <slot name="table-container">
      <slot name="table">
        <v-row class="box">
          <slot name="table-actions">
            <v-col>
              <v-btn style="font-weight: bold" color="primary" dark class="ml-2" small elevation="0" @click="main_action_onclick">
                {{ main_action_title }}
              </v-btn>
            </v-col>
          </slot>

          <v-col cols="12">
            <h4 class="ml-3" style="color:#035730;" :table_title="table_title">{{ table_title }}</h4>
            <slot name="table-summary">
            </slot>
            <slot name="table-content">
              <base-table :headers="headers"></base-table>
            </slot>
          </v-col>
        </v-row>
      </slot>
    </slot>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import BaseTable from "@/components/BaseTable.vue";
import IconBase from "@/components/IconBase.vue"

export default {
  props: ['headers', 'icon', 'title', 'subtitle', 'table_title', 'main_action_title', 'main_action_onclick'],
  data() {
    return {
      params: [],
    }
  },
  components: {
    BaseTable,
    IconBase
  },
  computed: {
    ...mapGetters({
      User: "StateUser",
    })
  },
  methods: {
  },
  created() {
  }
}
</script>

<style lang="scss">
.table a {
  text-decoration: none;
}

.v-image {
  margin: auto;
}
</style>
