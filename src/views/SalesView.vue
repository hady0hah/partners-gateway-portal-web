<template>

  <base-list-view :icon="getIcon()"  :title="title" :subtitle="subtitle" :table_title="table_title" :main_action_onclick="addDeal" :main_action_title="main_action_title" >
    <template v-slot:table-summary>
      <stats-status :itemCount="params" :statuses="Statuses"></stats-status>
    </template>
    <template v-slot:table-content>
      <base-table :headers="headers" :url="axios.defaults.endpoints.deal_list.url">
        <template v-slot:item.programLevel="{ item }">
          <v-icon :color="ProgramLevel(item['partnerProgramLevel.id']).color" small>mdi-circle</v-icon>
        </template>
        <template v-slot:item.renewalDate="{ item }">
          {{ friendlyDate(item.renewalDate.date) }}
        </template>
        <template v-slot:item.amount="{ item }">
          {{ (item.amount ? item.amount : '0') | currency }}
        </template>
        <template v-slot:item.status="{ item }">
          <v-img :src="getStatus(item['dealStatus.id']).imageFile" width="30"></v-img>
        </template>
        <template v-slot:item.region="{ item }">
          {{ getRegion(item['region.id']).name }}
        </template>
        <template v-slot:item.actions="{ item }">
          <router-link :to="'/deal/' + item.id"><v-btn x-small elevation="0">View/Edit</v-btn></router-link>
        </template>
      </base-table>
    </template>

  </base-list-view>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import BaseListView from "./base/BaseListView.vue";
import BaseTable from "@/components/BaseTable.vue";
import IconSales from "@/components/icons/IconSales";
import StatsStatus from "@/components/StatsStatus.vue";

export default {
  props: [],
  components: {
    BaseListView,
    BaseTable,
    StatsStatus,
  },
  data() {
    return {
      headers: [
        { text: '', value: 'programLevel', sortable: false, align: 'center' },
        { text: 'Deal Name', value: 'name', sortable: true, align: 'center' },
        { text: 'Renewal Date', value: 'renewalDate', sortable: true, align: 'center' },
        { text: 'Region', value: 'region', sortable: true, align: 'center' },
        { text: 'Amount', value: 'amount', sortable: true, align: 'center' },
        { text: 'Status', value: 'status', sortable: false, align: 'center' },
        { text: 'Actions', value: 'actions', sortable: false, align: 'center' },
      ],
      title:'Sales View',
      subtitle:"Deal Registration",
      table_title:"List of Previously Created Deals",
      main_action_title:"Add a deal",
      params: [],
    }
  },
  computed: {
    ...mapGetters({
      User: "StateUser",
      Statuses: "StateStatuses",
      ProgramLevel: "StateProgramLevel",
      Regions: "StateRegions"
    })
  },
  methods: {
    ...mapActions(["StateSetStatuses", "StateSetRegions"]),
    getIcon(){
      return IconSales
    },
    getStatus(status_id) {
      console.log(this.Statuses.find(status => status.id === status_id))
      return this.Statuses.find(status => status.id === status_id)
    },
    getRegion(region_id) {
      console.log(this.Regions.find(region => region.id === region_id))
      return this.Regions.find(region => region.id === region_id)
    },
    addDeal() {
      this.$router.push({ name: 'deal_add', params: { deal: {} } })
    },
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
