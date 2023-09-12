<template>
  <v-radio-group style="margin-top:-4px" v-bind="$attrs" v-model="radioState" v-on:change="onInput">
       <p style="color: #205023;display: none;">{{$attrs.label}}</p>
      <v-row>
        <v-col><v-radio label="Yes" :value="'yes'"></v-radio></v-col>
        <v-col><v-radio label="No" :value="'no'"></v-radio></v-col>
        <v-col><v-radio label="Other" :value="null"></v-radio></v-col>
        <v-col></v-col>
        <v-col class="col-12">
          <v-text-field :disabled="radioState === 'yes' || radioState === 'no'" label="Other" outlined v-model="otherState" v-on:input="onInput"></v-text-field>
        </v-col>
      </v-row>
  </v-radio-group>
</template>
<script>

export default {
  props : ['field','form_name'],
  data() {
    return {
      radioState:null,
      otherState:null,
    }
  },
  created() {
    this.getState()
  },
  methods : {
    onInput($event) {
      this.$attrs.value = $event
      this.getState()
      this.$emit('input', $event)
    },
    getState() {
      if(this.$attrs.value == 'yes' || this.$attrs.value == 'no') {
        this.radioState = this.$attrs.value
        this.otherState = null
      } else {
        this.radioState = null
        this.otherState = this.$attrs.value
      }
    }
  }
}
</script>
