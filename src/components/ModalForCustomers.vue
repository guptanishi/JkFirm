<template>
    <div class="modal" :class="{ 'is-active': this.showCustomerModal }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
         
        </header>
        <section class="modal-card-body">
          <CustomersList onModal="true" @customerRowClicked="clikedRow"/>
        </section>
      </div>
      <button @click="toggle" class="modal-close is-large" aria-label="close"></button>
    </div>
</template>

<script>
import { createNote }  from '../repository';
import CustomersList from './CustomersList.vue';
export default {
  name: 'modalForProduct',
  props: ['showCustomerModal'],
  components: {
      CustomersList
  },
  methods: {
    toggle(){
         this.showCustomerModal = !this.showCustomerModal;
    },
    clikedRow(data){
        this.$emit('rowClicked', data);
    }
  },
}
</script>