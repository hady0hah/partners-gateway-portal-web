<template>
  <base-list-view  :icon="getIcon()" :title="title" :subtitle="subtitle" :table_title="table_title" :main_action_onclick="addForecast" :main_action_title="main_action_title">
    <template v-slot:table-content>
      <base-table :headers="headers" :url="axios.defaults.endpoints.forecasting_list.url">
                <template v-slot:item.name="{ item }">
                  {{ item.name }}
                </template>
        <template v-slot:item.totalAmount="{ item }">
          {{ item.totalAmount }}
        </template>
                <template v-slot:item.created="{ item }">
                  {{ friendlyDate(item.created.date) }}
                </template>
                <template v-slot:item.actions="{ item }">
                  <router-link :to="{ name: 'forecasting_view', params: { id: item.id } }"><v-btn x-small elevation="0">View</v-btn></router-link>
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

export default {
  props: [],
  components: {
    BaseListView,
    BaseTable
  },
  data() {
    return {
      // list:{
      headers: [
        { text: 'Forecast Name', value: 'name', sortable: true, align: 'center' },
        { text: 'Forecasted Amount (USD)', value: 'totalAmount', sortable: true, align: 'center' },
        { text: 'Forecast Submission  Date', value: 'created', sortable: true, align: 'center' },
        { text: 'Actions', value: 'actions', sortable: false, align: 'center' },
      ],
      // },
      title:'Sales & Marketing',
      subtitle:"Forecasting",
      table_title:"List of previously created Forecasts",
      main_action_title:"Add a Forecast",


      params: [],
      deals: [],
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
    getRegion(region_id) {
      return this.Regions.find(region => region.id === region_id)
    },
    addForecast() {
      this.$router.push({ name: 'forecasting_add' })
    },
  },
  created() {
    const t = this
    this.$Progress.start()
    this.axios.get('private/status/list', {})
      .then(function (response) {
        t.$Progress.finish()
        t.StateSetStatuses(response.data.data)
      })
      .catch(err => {
        console.log(err);
      });
    this.axios.get('private/region/list', {})
      .then(function (response) {
        t.$Progress.finish()
        t.StateSetRegions(response.data.data)
      })
      .catch(err => {
        console.log(err);
      });
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
