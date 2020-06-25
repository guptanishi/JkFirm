<template>
    <div class="modal" :class="{ 'is-active': this.show }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
         
        </header>
        <section class="modal-card-body">
          <LoadProductList onModal="true" @productRowClicked="clikedRow"/>
        </section>
      </div>
      <button @click="toggle" class="modal-close is-large" aria-label="close"></button>
    </div>
</template>

<script>
import { createNote }  from '../repository';
import LoadProductList from './LoadProductList.vue';
export default {
  name: 'modalForProduct',
  props: ['show'],
  components: {
      LoadProductList
  },
  data(){
    return {
      title: '',
      body: '',
    }
  },
  methods: {
    toggle(){
         this.show = !this.show;
    },
    clikedRow(data){
        this.$emit('rowClicked', data);
    }
  },
}
</script>