<template>
  <v-data-table :headers="headers" :items="items" :server-items-length="count"
    :footer-props="{ 'items-per-page-options': [16, 32, 64, 128, -1] }" @update:page="tablePageUpdated"
    @update:items-per-page="tableItemsPerPageUpdated" @update:sort-by="tableSortByUpdated"
    @update:sort-desc="tableSortDescUpdated" class="table">
    <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope"><slot :name="slot" v-bind="scope"/></template>
  </v-data-table>
</template>

<script>
import eventBus from '@/eventBus'

export default {
  props: ['url', 'headers'],
  data() {
    return {
      // headers: [],
      items: [],
      count: 0,
      page: 1,
      itemsPerPage: 16,
      sortBy: '',
      sortDesc: 'ASC'
    }
  },
  methods: {
    tablePageUpdated(page) {
      this.page = page
      this.getItems()
    },
    tableItemsPerPageUpdated(itemsPerPage) {
      this.itemsPerPage = itemsPerPage
      this.getItems()
    },
    tableSortByUpdated(sortBy) {
      if (sortBy) {
        this.sortBy = sortBy
        if (this.sortBy == 'renewalDate')
          this.sortBy = 'renewal_date'
      }
      else
        this.sortBy = ''
      this.getItems()
    },
    tableSortDescUpdated(sortDesc) {
      if (sortDesc)
        this.sortDesc = "DESC"
      else
        this.sortDesc = "ASC"
      this.getItems()
    },
    getItems() {
      const t = this
      this.$Progress.start()
      this.axios.get(this.url + '?filter[_page]=' + this.page + '&filter[_per_page]=' + this.itemsPerPage + '&filter[_sort_by]=' + this.sortBy + '&filter[_sort_order]=' + this.sortDesc, {})
        .then(function (response) {
          t.$Progress.finish()
          t.count = response.data.count
          t.items = response.data.data.items
          t.params = response.data.data.params
          eventBus.$emit('data-received', response);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getItems()
  },
}
</script>
