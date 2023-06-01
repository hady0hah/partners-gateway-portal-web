<template>
  <div class="container">
    <v-row class="mt-4">
      <h4>Welcome, {{ User.username }}</h4>
    </v-row>
    <v-row class="mt-8 text-center box">
      <v-col :cols="12/Statuses.length" v-for="status in Statuses" :key="status.id">
        <v-card elevation="2" shaped class="pa-4">
          <v-row>
            <v-col cols="3">
              <v-img :src="status.icon"></v-img>
            </v-col>
            <v-col cols="9">
              <div>{{ params[status.name] }}</div>
              <div>{{ status.label }}</div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="mt-12 box">
      <h5>Latest Updates</h5>
      <v-btn
        color="primary"
        dark
        class="ml-2"
        small
        elevation="0"
        @click="addDeal"
      >
        Add a deal
      </v-btn>
    </v-row>
    <v-row class="box">
      <v-col cols="12">
        <v-data-table 
          :headers="headers" 
          :items="deals" 
          :server-items-length="count" 
          :footer-props="{'items-per-page-options':[16, 32, 64, 128, -1]}"
          @update:page="tablePageUpdated" 
          @update:items-per-page="tableItemsPerPageUpdated"
          @update:sort-by="tableSortByUpdated"
          @update:sort-desc="tableSortDescUpdated"
          class="table"
        >
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
            <v-img :src="getStatus(item['dealStatus.id']).icon" width="30"></v-img>
          </template>
          <template v-slot:item.region="{ item }">
            {{ getRegion(item['region.id']).label }}
          </template>
          <template v-slot:item.actions="{ item }">
            <router-link :to="'/deal/'+item.id"><v-btn x-small elevation="0">View/Edit</v-btn></router-link>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import { mapActions } from "vuex";

  export default {
    name: 'DashboardView',
    props: [],
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
        params: [],
        deals: [],
        count : 0,
        page: 1,
        itemsPerPage: 16,
        sortBy: '',
        sortDesc: 'ASC'
      }
    },
    components: {
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
      
      getStatus(status_id) {
        return this.Statuses.find(status => status.id === status_id)
      },
      getRegion(region_id) {
        return this.Regions.find(region => region.id === region_id)
      },
      addDeal() {
    		this.$router.push({ name: 'deal_add', params: { deal: {} }})
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
    			this.sortDesc= "ASC"
    		this.getDeals()
    	},
    	getDeals() {
    	  const t = this
    	  this.$Progress.start()
        this.axios.get('private/deals/list?filter[_page]='+this.page+'&filter[_per_page]='+this.itemsPerPage+'&filter[_sort_by]='+this.sortBy+'&filter[_sort_order]='+this.sortDesc, {})
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
        
        t.axios.get('private/region/list', {})
        .then(function (response) {
          t.$Progress.finish()
          t.StateSetRegions(response.data.data)
        
          t.getDeals()
        })
        .catch(err => {
          console.log(err);
        });
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
