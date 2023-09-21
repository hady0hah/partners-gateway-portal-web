<template>
  <v-radio-group style="margin-top:-4px" v-bind="field.radio" :name="field.radio.full_name" v-model="radioState" v-on:change="onInputRadio">
       <p style="color: #205023;display: none;">{{$attrs.label}}</p>
      <v-row>
        <v-col><v-radio label="Yes" :value="'yes'"></v-radio></v-col>
        <v-col><v-radio label="No" :value="'no'"></v-radio></v-col>
        <v-col><v-radio label="Other" :value="'other'"></v-radio></v-col>
        <v-col></v-col>
        <v-col class="col-12">
          <v-text-field :disabled="radioState !== 'other'" :name="field.other.full_name" label="Other" outlined v-model="otherState" v-on:input="onInputOther"></v-text-field>
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
    this.updateState()
  },
  methods : {
    onInputRadio($event) {
      this.$attrs.value.radio = $event
      this.onInput()
    },
    onInputOther($event) {
      this.$attrs.value.other = $event
      this.onInput()
    },
    onInput() {
      this.updateState()
      var o = {}
      o[this.field.radio.name] = this.radioState
      o[this.field.other.name] = this.otherState
      this.$emit('input', o)
    },
    updateState() {
      this.radioState = this.$attrs.value.radio
      if(this.$attrs.value.radio == 'other') {
        this.otherState = this.$attrs.value.other
      } else {
        this.otherState = null
      }
    }
  }
}
</script>
