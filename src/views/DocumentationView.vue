<template>
  <div class="container">
    <div class="box pa-8">
      <v-row>
        <h5>Documents</h5>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-data-table 
            :headers="headers" 
            :items="documents" 
            :server-items-length="count" 
            :footer-props="{'items-per-page-options':[16, 32, 64, 128, -1]}"
            @update:page="tablePageUpdated" 
            @update:items-per-page="tableItemsPerPageUpdated"
            @update:sort-by="tableSortByUpdated"
            @update:sort-desc="tableSortDescUpdated"
          >
            <template v-slot:item.latestUpdate.date="{ item }">
              {{ friendlyDate(item.latestUpdate.date) }}
            </template>
            <template v-slot:item.actions="{ item }">
              <v-btn elevation="0" x-small class="ma-1" @click="viewFile(item)">View</v-btn>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      headers: [
        { text: 'Document Name', value: 'name', sortable: true, align: 'center' },
        { text: 'Latest Update', value: 'latestUpdate.date', sortable: true, align: 'center' },
        { text: 'Actions', value: 'actions', sortable: false, align: 'center' }
      ],
      documents: [],
      count : 0,
      page: 1,
      itemsPerPage: 16,
      sortBy: '',
      sortDesc: 'ASC'
    }),
    created () {
      this.getDocuments()
    },
    methods: {
      tablePageUpdated(page) {
    	  this.page = page
    	  this.getDocuments()
    	},
    	tableItemsPerPageUpdated(itemsPerPage) {
    	  this.itemsPerPage = itemsPerPage
    	  this.getDocuments()
    	},
    	tableSortByUpdated(sortBy) {
    		if (sortBy) {
    			this.sortBy = sortBy
    			if (this.sortBy == 'latestUpdate.date')
    			  this.sortBy = 'latest_update'
    		}
    		else
    			this.sortBy = ''
    		this.getDocuments()
    	},
    	tableSortDescUpdated(sortDesc) {
    		if (sortDesc)
    			this.sortDesc = "DESC"
    		else
    			this.sortDesc= "ASC"
    		this.getDocuments()
    	},
    	getDocuments() {
    	  const t = this
    	  this.$Progress.start()
    	  
        this.axios.get('private/document/list?filter[_page]='+this.page+'&filter[_per_page]='+this.itemsPerPage+'&filter[_sort_by]='+this.sortBy+'&filter[_sort_order]='+this.sortDesc, {})
        .then(function (response) {
          t.$Progress.finish()
          t.count = response.data.count
          t.documents = response.data.data
        })
        .catch(err => {
          console.log(err);
        });
      },
      viewFile (document) {
        window.open(document.file, "_blank");    
      },
      downloadFile (doc) {
        this.axios.get(doc.file, { responseType: 'blob' })
          .then(response => {
            const blob = new Blob([response.data], { type: 'application/pdf' })
            const link = document.createElement('a')
            link.href = URL.createObjectURL(blob)
            link.download = "download"
            link.click()
            URL.revokeObjectURL(link.href)
          }).catch(console.error)
      }
    }
  }
</script>

