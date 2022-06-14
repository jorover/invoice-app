<template>
        <section ref="itemContent" class="itemDisplayContainer" >
            <InvoiceFilter 
            :invoices="invoiceList" 
            :filterData="filterData" />
            <Invoices :invoices="invoices" />
            <section class="itemOverlay" @click="removeClass"></section>
        </section> 
</template>

<script>
import InvoiceFilter from '../components/InvoiceFilter.vue'
import Invoices from '../components/Invoices.vue'


export default {
    props: {
        invoices: Array,
        filterData: Function
    },

    data(){
        return{
            invoiceList: this.invoices
        }
    },
    components:{
        InvoiceFilter,
        Invoices
    },
    methods:{
        removeClass(){
            document.body.classList.remove('createForm');
            document.body.classList.remove('editForm');
            document.querySelectorAll('.checkInputValues').forEach(item => {
                item.parentElement.classList.remove('formCheck');
                item.parentElement.classList.remove('blurError');
            })
            document.querySelector('.errorContent').style.display = 'none';
        }
    }
}
</script>

<style>

</style>