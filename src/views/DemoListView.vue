<template>
  <div class="container pl-16">
          <v-row class="mt-4">
            <v-col cols="12" style="margin-left: -60px;">
              <icon-base style="min-width: 60px;padding: 0 8px;">
                <icon-demo />
              </icon-base><span style="color:#035730;">Demo</span>
            </v-col>
          </v-row>
  	<div class="box pa-8 mt-14">
			<v-row>
				<h4>Demo</h4>
				<v-btn
					color="primary"
					dark
					class="ml-2"
					small
					elevation="0"
					@click="bookDemo"
				>
          Book a demo
				</v-btn>
			</v-row>
			<v-row>
				<v-col cols="5">
					<v-menu
						:close-on-content-click="false"
						:nudge-right="40"
						transition="scale-transition"
						offset-y
						min-width="auto"
					>
						<template v-slot:activator="{ on, attrs }">
							<v-text-field
								v-model="dateRangeText"
								label="Dates"
								prepend-icon="mdi-calendar"
								readonly
								v-bind="attrs"
								v-on="on"
							></v-text-field>
						</template>
						<v-date-picker
							v-model="dates"
							@input="menu2 = false"
							range
						></v-date-picker>
					</v-menu>
				</v-col>
				<v-col cols="2">
					<v-btn class="" color="primary" @click="filter" small elevation="0">Filter</v-btn>
					<v-btn class="ml-2" color="" @click="clear" small elevation="0">Clear</v-btn>
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="12">
					<v-data-table
						:headers="headers"
						:items="demos"
						:server-items-length="count"
						:footer-props="{'items-per-page-options':[16, 32, 64, 128, -1]}"
						@update:page="tablePageUpdated"
						@update:items-per-page="tableItemsPerPageUpdated"
						@update:sort-by="tableSortByUpdated"
						@update:sort-desc="tableSortDescUpdated"
						class="table"
					>
						<template v-slot:item.timeslot.day.date="{ item }">
							<span v-if="!item.timeslot.id">-</span><span v-if="item.timeslot.id">{{ friendlyDate(item.timeslot.day.date) }}</span>
						</template>
            <template v-slot:item.timeslot="{ item }">
              <span v-if="!item.timeslot.id">-</span>
              <span v-if="item.timeslot.id">{{ getTime(item.timeslot.startTime.date) }} - {{ getTime(item.timeslot.endTime.date) }}</span>
            </template>
            <template v-slot:item.deal="{ item }" v-if="deals">
            <span v-if="item['deal.id'] !== null">
            {{ getDeal(item['deal.id']).name }}
            </span>
              <span v-else>
                -
              </span>
            </template>
						<template v-slot:item.product="{ item }" v-if="products">
							{{ getProduct(item['product.id']).name }}
						</template>
						<template v-slot:item.status="{ item }">
							<v-chip v-if="!item.timeslot.id" class="ml-2" :color="'blue'" label small>
              	Not booked
							</v-chip>
							<v-chip v-if="item.timeslot.id && item.timeslot.booked" class="ml-2" :color="'green'" label dark small>
								Booked
							</v-chip>
							<v-chip v-if="item.timeslot.id && !item.timeslot.booked" class="ml-2" :color="'gray'" label dark small>
								Canceled
							</v-chip>
						</template>
						<template v-slot:item.actions="{ item }">
							<router-link :to="{ name: 'demo_view', params: { id: item.id, _demo: item }}"><v-btn x-small elevation="0">View/Edit</v-btn></router-link>
						</template>
					</v-data-table>
				</v-col>
			</v-row>
		</div>
  </div>
</template>

<script>
import IconBase from "@/components/IconBase.vue"
import IconDemo from "@/components/icons/IconDemo.vue"

  export default {
    components: {
      IconBase,
      IconDemo,
    },
    data: () => ({
    	headers: [
    		{ text: 'Date', value: 'timeslot.day.date', sortable: false, align: 'center' },
        { text: 'Start / End Time', value: 'timeslot', sortable: false, align: 'center' },
				{ text: 'Deal', value: 'deal', sortable: false, align: 'center' },
				{ text: 'Product', value: 'product', sortable: false, align: 'center' },
				{ text: 'Pax Number', value: 'paxNumber', sortable: false, align: 'center' },
				{ text: 'Status', value: 'status', sortable: false, align: 'center' },
				{ text: 'Actions', value: 'actions', sortable: false, align: 'center' }
			],
      demos: [],
      deals: null,
      products: null,
      count : 0,
      page: 1,
      itemsPerPage: 16,
      sortBy: '',
      sortDesc: 'ASC',
      dates: []
    }),
    computed: {
    	dateRangeText () {
    		if (this.dates.length == 0)
    			return ""

    		if (this.dates.length == 2) {
					const startDate = this.dates.reduce(function (a, b) { return a < b ? a : b; });
					const endDate = this.dates.reduce(function (a, b) { return a > b ? a : b; });
					this.dates = []
					this.dates.push(startDate)
					this.dates.push(endDate)
				}

        return this.dates.join(' ~ ')
      },
    },
    methods: {
    	getDeal(deal_id) {
    		if (this.deals != null)
    			return this.deals.find(deal => deal.id === deal_id)
    	},
    	getProduct(product_id) {
    		if (this.products != null)
    			return this.products.find(product => product.id === product_id)
    	},
    	bookDemo() {
    		this.$router.push({ name: 'demo_add', params: { _demo: {} }})
    	},
    	tablePageUpdated(page) {
    	  this.page = page
    	  this.getDemos()
    	},
    	tableItemsPerPageUpdated(itemsPerPage) {
    	  this.itemsPerPage = itemsPerPage
    	  this.getDemos()
    	},
    	tableSortByUpdated(sortBy) {
    		if (sortBy)
    			this.sortBy = sortBy
    		else
    			this.sortBy = ''
    		this.getDemos()
    	},
    	tableSortDescUpdated(sortDesc) {
    		if (sortDesc)
    			this.sortDesc = "DESC"
    		else
    			this.sortDesc= "ASC"
    		this.getDemos()
    	},
    	getDemos(sd, sm, sy, ed, em, ey) {
    	  const t = this
    	  var endpoint = 'private/demo/list?filter[_page]='+this.page+'&filter[_per_page]='+this.itemsPerPage+'&filter[_sort_by]='+this.sortBy+'&filter[_sort_order]='+this.sortDesc

    	  if (sd && sm && sy && ed && em && ey) {
    	  	endpoint += '&filter[timeslot__day][value][start][day]='+sd
    	  	endpoint += '&filter[timeslot__day][value][start][month]='+sm
    	  	endpoint += '&filter[timeslot__day][value][start][year]='+sy
    	  	endpoint += '&filter[timeslot__day][value][end][day]='+ed
    	  	endpoint += '&filter[timeslot__day][value][end][month]='+em
    	  	endpoint += '&filter[timeslot__day][value][end][year]='+ey
    	  }
        // else {
    	  // 	const now = this.todayDate()
    	  // 	sd = this.getDay(now)
    		// 	sm = this.getMonth(now)
    		// 	sy = this.getYear(now)
    	  // 	endpoint += '&filter[timeslot__day][value][start][day]='+sd
    	  // 	endpoint += '&filter[timeslot__day][value][start][month]='+sm
    	  // 	endpoint += '&filter[timeslot__day][value][start][year]='+sy
    	  // }

    	  this.$Progress.start()
				this.axios.get(endpoint, {})
				.then(function (response) {
					t.$Progress.finish()
					t.count = response.data.count
					response.data.data.forEach((demo) => {
						demo.timeslot = {}
					})
					t.demos = response.data.data
					t.demos.forEach((demo) => {
						if (!demo['timeslot.id'])
							return
						t.$Progress.increase(10)
						t.axios.get('private/timeslots/show?id='+demo['timeslot.id'], {})
						.then(function (response) {
							demo.timeslot = response.data.data
						})
						.catch(err => {
							console.log(err);
						});
					});
				})
				.catch(err => {
					console.log(err);
				});
    	},
    	filter() {
    		const startDate = this.dates.reduce(function (a, b) { return a < b ? a : b; });
    		const endDate = this.dates.reduce(function (a, b) { return a > b ? a : b; });
    		const sd = this.getDay(startDate)
    		const sm = this.getMonth(startDate)
    		const sy = this.getYear(startDate)
    		const ed = this.getDay(endDate)
    		const em = this.getMonth(endDate)
    		const ey = this.getYear(endDate)

    		this.getDemos(sd, sm, sy, ed, em, ey)
    	},
    	clear() {
    		this.dates = []
    		this.getDemos()
    	}
    },
    created () {
      const t = this

      this.axios.get('private/deals/list', {})
      .then(function (response) {
        t.deals = response.data.data.items
      })
      .catch(err => {
        console.log(err);
      });

      this.$Progress.increase(10)
      this.axios.get('private/product/list', {})
      .then(function (response) {
      	t.$Progress.finish()
        t.products = response.data.data
      })
      .catch(err => {
        console.log(err);
      });

      this.getDemos()
    }
  }
</script>

<style lang="scss">
  .table a {
    text-decoration: none;
  }
  .v-btn {
    font-weight: bold;
  }
</style>

