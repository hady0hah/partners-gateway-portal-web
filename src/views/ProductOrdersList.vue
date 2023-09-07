<template>
  <base-list-view  :icon="getIcon()" :title="title" :subtitle="subtitle" :table_title="table_title" :main_action_onclick="addOrder" :main_action_title="main_action_title">
    <template v-slot:table-summary>
      <stats-status :itemCount="params" :statuses="POStatuses"></stats-status>
    </template>
    <template v-slot:table-content>
      <base-table :headers="headers" :url="axios.defaults.endpoints.po.list">
        <template v-slot:item.id="{ item }">
          {{ item.id }}
        </template>
        <template v-slot:item.name="{ item }">
          {{ item['endCustomer.name'] }}
        </template>
        <template v-slot:item.created="{ item }">
          {{ friendlyDate(item.created.date) }}
        </template>
        <template v-slot:item.status="{ item }">
          <v-img :src="getStatus(item['status.id']).imageFile" width="30"></v-img>
        </template>
        <template v-slot:item.actions="{ item }">
          <router-link :to="{ name: 'order_view', params: { id: item.id, disabled: !item.isEditable } }"><v-btn x-small elevation="0">View/Edit</v-btn></router-link>
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
import eventBus from "@/eventBus";

export default {
  props: [],
  components: {
    BaseListView,
    BaseTable,
    StatsStatus,
  },
  data() {
    return {
      // list:{
      headers: [
        { text: 'PO Number', value: 'id', sortable: true, align: 'center' },
        { text: 'Contact Name', value: 'endCustomer.name', sortable: true, align: 'center' },
        { text: 'Order Date', value: 'created', sortable: true, align: 'center' },
        { text: 'Status', value: 'status', sortable: false, align: 'center' },
        { text: 'Actions', value: 'actions', sortable: false, align: 'center' },
      ],
      // },
      title:'Sales & Marketing',
      subtitle:"Ordering, Invoicing & Delivery",
      table_title:"List of previously created POs",
      main_action_title:"Add a Product Order (PO)",

      POStatuses:[],
      params: [],
      deals: [],
      count: 0,
      page: 1,
      itemsPerPage: 16,
      sortBy: '',
      sortDesc: 'ASC'
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

      return this.POStatuses.find(status => status.id === status_id)
    },
    addOrder() {
      this.$router.push({ name: 'order_add' })
    },
    handleDataReceived(response) {
      this.params = response.data.data.params
    }
  },
  destroyed() {
    eventBus.$off('data-received', this.handleDataReceived);
  },
  created() {
    eventBus.$on('data-received', this.handleDataReceived);
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
    this.axios.get(axios.defaults.endpoints.marketing_statuses.url, {})
      .then(function (response) {
        t.$Progress.finish()
        t.POStatuses = response.data.data
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
