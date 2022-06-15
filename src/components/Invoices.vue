<template>
  <section class="invoicesContainer" v-if="invoice">
       <router-link :to="{ name: 'EachInvoice', params:{ id:invoice.id } }" v-for= "invoice in invoices[0]" :key="invoice.id" class="eachInvoice" @click="eachInvoice(invoice.id)">
          <p>#<a> {{ invoice.id }}</a></p>
          <p> Due {{ store.paymentDue(invoice.paymentDue)  }} </p>
          <p> {{ invoice.clientName }}</p>
          <h3> £{{ invoice.total === '' ? 0 : invoice.total }} </h3>
          <li class="status"> {{ invoice.status }}</li>
      </router-link>
</section>

<section class="invoicesContainer" v-else>
    <router-link :to="{ name: 'EachInvoice', params:{ id:invoice.id } }" v-for= "invoice in invoices[0]" :key="invoice.id" class="innerEachInvoice" @click="eachInvoice(invoice.id)">
            <article>
                <p>#<a> {{ invoice.id }}</a></p>
                <p> Due {{ store.paymentDue(invoice.paymentDue)  }} </p>
                <p> £{{ invoice.total === '' ? 0 : invoice.total }} </p>
            </article>

            <article>
                <p> {{ invoice.clientName }}</p>
                <li class="status"> {{ invoice.status }}</li>
            </article>
    </router-link>
</section>
</template>

<script>    

import { store } from './store'

export default {
    props:{
        invoices: Array
    },

    data(){
        return{
            store,
            invoice: true
        }
    },

    methods:{
        eachInvoice(invoiceTag){
            let allItems = JSON.parse(localStorage.getItem('All Items'));
            let eachItem = allItems.filter(item => {
                const {id} = item;
                return id === invoiceTag;
            })
            localStorage.setItem('Each Invoice', JSON.stringify(eachItem))
        },

        statusCheck(){
            const status = document.querySelectorAll('.status');
            Array.from(status, item => {
                if(item.innerText === 'Pending'){
                    item.parentElement.classList.add('pendingBg');
                } else if(item.innerText === 'Paid'){
                    item.parentElement.classList.add('paidBg');
                } else {
                    item.parentElement.classList.add('draftBg');
                }
            })
        }
        
    },

    created(){
        store.paymentDue();
    },

    mounted(){
        this.statusCheck();
        window.addEventListener('resize', ()=> {
            if(window.innerWidth <= 768){
                this.invoice = false;
            } else {
                this.invoice = true;
            }
        })

         if(window.innerWidth <= 768){
                this.invoice = false;
            } else {
                this.invoice = true;
        }
    },

    updated(){
        this.statusCheck();
    }
}
</script>

<style>

.eachInvoice, .innerEachInvoice{
    text-decoration: none;
    color: #fff;
}

.eachInvoice h3{
    padding-right: 10px;
}

</style>