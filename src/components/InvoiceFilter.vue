<template>
  <section class="itemFilterContainer">
      <article class="itemFilterleftContent">
          <h3> Invoices </h3>
          <p ref="countMsg"> There are {{ store.count }} total invoices. </p>
      </article>

      <article class="itemFilterRightContent">

        <section class="filterContent">

        <article class="selectContainer">
               <select ref="select">
                   <option value=""> Filter <a class="filterText">by Status </a></option>
                   <option value="paid"> Paid  </option>
                   <option value="pending"> Pending  </option>
                   <option value="draft"> Draft  </option>
               </select>
        </article>

      </section>

      <aside class="btn newInvoiceContainer" @click="addClass">
          <div class="circle">
             <p> + </p> 
          </div>
          <p> New <a class="filterText">Invoice</a> </p>
      </aside>

      </article>
  </section>
</template>

<script>

import { store } from './store'


export default { 
    props:{
        invoices: Array,
        filterData: Function
    },

    data(){
        return {
            allInvoices: this.invoices,
            store
        }
    },

    methods:{
        addClass(){
           document.body.classList.add('createForm');
        },

        countInvoice(){
            return localStorage.getItem('ItemCount')
        },

        invoiceDetail(selectedValue){
            const allInvoices = JSON.parse(localStorage.getItem('All Items'));
            const invoicesCount = allInvoices.filter(t => t.status === selectedValue)
            const updatedCount = invoicesCount.length === 0 && selectedValue === '' ? invoicesCount.length = allInvoices.length : invoicesCount.length;
            const invoicePlural = invoicesCount.length <= 1 ? 'invoice' : 'invoices'
            const isAre = invoicesCount.length === 1 ? 'is' : 'are'
            this.$refs.countMsg.innerText = `There ${isAre} ${updatedCount} ${selectedValue === '' ? 'total' : selectedValue} ${invoicePlural}`;
            
        }

    },

    mounted(){
        const selectItem = this.$refs.select;
        const allInvoices = JSON.parse(localStorage.getItem('All Items'));
        selectItem.addEventListener('change', ()=> {
            if(allInvoices === null){
                this.filterData(selectItem.value);
                this.invoiceDetail(selectItem.value);
            } else {
                this.filterData(selectItem.value);
                this.invoiceDetail(selectItem.value);
            }
       })
    },
}
</script>

<style>


@media (max-width: 600px){
    .filterText{
        display:none
    }
}

@media (max-width: 310px){
    .filterText{
        display:inline-block;
    }

    .newInvoiceContainer{
        margin-top: 10px;
    }
}

</style>