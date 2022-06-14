<template>
  <header class="invoiceContainer">
    <InvoiceForm 
    :invoices="invoices" 
    :localData="localData" 
    :getLocalData="getLocalData" />
    <InvoiceList 
    :invoices="invoices" 
    :invoiceLink="invoiceLink" 
    :filterData="filterData"/>
  </header>
   
</template>

<script>

import InvoiceForm from '../components/InvoiceForm.vue'
import InvoiceList from '../components/InvoiceList.vue'
import { store } from '../components/store'
import data from '/public/data.json'



export default {
name: "Home",
props:{
    invoiceLink:String
},
  data(){
    return{
      invoices: [],
      url: data ,
      localData: JSON.parse(localStorage.getItem('All Items')),
      store
    }
  },

  components:{
    InvoiceForm,
    InvoiceList
  },

    methods:{
        fetchData(){
           try {
               const xttp = new XMLHttpRequest;
               xttp.onload = () => {
                let response = JSON.parse(xttp.responseText);
                this.invoices.push(response);
                localStorage.setItem('All Items', JSON.stringify(response));
                store.count = this.invoices[0].length
               }  
               xttp.open('GET', this.url);
               xttp.send();      
           } catch (error) {
               console.log(error)
           }


        },

        getLocalData(){
          const newData = JSON.parse(localStorage.getItem('All Items'))
          this.invoices.push(newData)
          store.count = this.invoices[0].length
          return this.invoices[0]
        },

        filterData(item){
          if(this.localData === null){
            let allItems = JSON.parse(localStorage.getItem('All Items'))
            if(item === ''){
              return this.invoices[0] = allItems
            } else {
            let newItems = allItems.filter(t => {
              if(t.status === item){
                return t;
              }
            })
            this.invoices[0] = newItems;
            }
          } else {
              if(item === ''){
                return this.invoices[0] = this.localData
              } else {
                let allItems = this.localData.filter(t => {
                if(t.status === item){
                  return t;
                 }
                })     
                this.invoices[0] = allItems;
                }   
          }
        }
    },

    created(){
      const allItems = localStorage.getItem('All Items');
      allItems ? this.getLocalData() : this.fetchData();
    },

    mounted(){
      store.removeEachInvoice();
      store.formCheck = false;
    },

    watch:{
      localData: 'getLocalData'
    }
}

</script>

<style>

</style>