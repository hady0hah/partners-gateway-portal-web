<template>
  <base-list-view  :icon="getIcon()" :title="title" :subtitle="subtitle" :table_title="table_title" :main_action_onclick="addOrder" :main_action_title="main_action_title">
    <template v-slot:table-summary>
      <v-row class="box">
        <v-card elevation="2" shaped class="pa-4" style="display: flex; flex-wrap: wrap;width: 90%;">
          <v-row :cols="12/Statuses.length" v-for="status in Statuses" :key="status.id" style="margin-top: 0px">
            <v-col cols="3">
              <v-img :src="status.icon"></v-img>
            </v-col>
            <v-col cols="9">
              <div>{{ params[status.name] }}</div>
              <div>{{ status.label }}</div>
            </v-col>
          </v-row>
        </v-card>
      </v-row>
    </template>
    <template v-slot:table-content>
      <base-table :headers="headers" :url="'private/deals/list'">
        <template v-slot:item.renewalDate="{ item }">
          {{ friendlyDate(item.renewalDate.date) }}
        </template>
        <template v-slot:item.amount="{ item }">
          {{ (item.amount ? item.amount : '0') | currency }}
        </template>
        <template v-slot:item.status="{ item }">
          <v-img :src="getStatus(item['dealStatus.id']).icon" width="30"></v-img>
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
        { text: 'Deal Name', value: 'name', sortable: true, align: 'center' },
        { text: 'Renewal Date', value: 'renewalDate', sortable: true, align: 'center' },
        { text: 'Amount', value: 'amount', sortable: true, align: 'center' },
        { text: 'Status', value: 'status', sortable: false, align: 'center' },
        { text: 'Actions', value: 'actions', sortable: false, align: 'center' },
      ],
      // },
      title:'Sales & Marketing',
      subtitle:"Ordering, Invoicing & Delivery",
      table_title:"List of previously created POs",
      main_action_title:"Add a Product Order (PO)",


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
      return this.Statuses.find(status => status.id === status_id)
    },
    addOrder() {
      this.$router.push({ name: 'order_add' })
    },
    tablePageUpdated(page) {
      this.page = page
      this.getDeals()
    },
    tableItemsPerPageUpdated(itemsPerPage) {
      this.itemsPerPage = itemsPerPage
      this.getDeals()
    },
    tableSortByUpdated(sortBy) {
      if (sortBy) {
        this.sortBy = sortBy
        if (this.sortBy == 'renewalDate')
          this.sortBy = 'renewal_date'
      }
      else
        this.sortBy = ''
      this.getDeals()
    },
    tableSortDescUpdated(sortDesc) {
      if (sortDesc)
        this.sortDesc = "DESC"
      else
        this.sortDesc = "ASC"
      this.getDeals()
    },
    getDeals() {
      const t = this
      this.$Progress.start()
      this.axios.get('private/deals/list?filter[_page]=' + this.page + '&filter[_per_page]=' + this.itemsPerPage + '&filter[_sort_by]=' + this.sortBy + '&filter[_sort_order]=' + this.sortDesc, {})
        .then(function (response) {
          t.$Progress.finish()
          t.count = response.data.count
          t.deals = response.data.data.deals
          t.params = response.data.data.params
        })
        .catch(err => {
          console.log(err);
        });
    }
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
