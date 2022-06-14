<template>

<section>

<div class="container scrollContainer" v-for="form in forms" :key="form.id">
        <h2> Edit#{{ form.id }} </h2>
        <form :class="formContent.formContent"> 
            <h5> Bill From </h5>
            <form :class="formContent.formControl">
                <label> {{ formContent.streetAddress }} </label>
                <input type="text" 
                class="address senderStreet inputValues" 
                v-model="form.senderAddress.street">
            </form>
            <form :class="formContent.formAddressContent">
               <form :class="formContent.formControl">
                    <label> {{ formContent.city }} </label>
                    <input type="text" 
                    v-model="form.senderAddress.city" 
                    class="senderCity inputValues">
                </form>
                <form :class="formContent.formControl">
                    <label> {{ formContent.postCode }} </label>
                    <input type="text" 
                    v-model="form.senderAddress.postCode" 
                    class="senderPostCode inputValues">
                </form>
                <form :class="formContent.formControl">
                    <label> {{ formContent.country }} </label>
                    <input type="text" 
                    v-model="form.senderAddress.country" 
                    class="senderCountry inputValues">
                </form>
            </form>
        </form>

        <form :class="formContent.formContent">
            <h5> Bill To </h5>
            <form :class="formContent.formControl">
                <label> Client's Name </label>
                <input type="text" 
                v-model="form.clientName" 
                class="clientName inputValues">
            </form>
            <form :class="formContent.formControl">
                <label> Client's Email </label>
                <input type="text" 
                placeholder="e.g.@example.com" 
                v-model="form.clientEmail" 
                class="clientEmail inputValues">
            </form>
            <form :class="formContent.formControl">
                <label> {{ formContent.streetAddress }} </label>
                <input 
                type="text" 
                v-model="form.clientAddress.street" 
                class="clientStreet inputValues">
            </form>
            <form :class="formContent.formAddressContent">
               <form :class="formContent.formControl">
                    <label> {{ formContent.city }} </label>
                    <input type="text" 
                    v-model="form.clientAddress.city" 
                    class="clientCity inputValues">
                </form>
                <form :class="formContent.formControl">
                    <label> {{ formContent.postCode }} </label>
                    <input type="text" 
                    v-model="form.clientAddress.postCode" 
                    class="clientPostCode inputValues">
                </form>
                <form :class="formContent.formControl">
                    <label> {{ formContent.country }} </label>
                    <input type="text" 
                    v-model="form.clientAddress.country" 
                    class="clientCountry inputValues">
                </form>
            </form>

            <form :class="formContent.invoiceContent">
               <form :class="formContent.formControl">
                    <label> Invoice Date </label>
                    <input type="date" 
                    class="inputDate inputValues" 
                    v-model="form.createdAt">
                </form>
                <form :class="formContent.formControl">
                    <label> Payment Terms </label>
                    <select class="paymentTerms">
                        <option value=""> Net 30 days </option>
                        <option value=1> Net 1 Day </option>
                        <option value=4> Net 4 Days </option>
                        <option value=7> Net 7 Days </option>
                        <option value=14> Net 14 Days </option>
                    </select>
                </form>
            </form>

             <form :class="formContent.formControl">
                    <label> Desciption </label>
                    <input type="text" 
                    placeholder="e.g.Graphic Design Service" 
                    v-model="form.description" 
                    class="description inputValues">
                </form>
        </form>

        <section class="itemListContainer">
            <h3> Item List </h3>
            <article class="itemQuantityContainer" v-if="itemContainer">
                <article class="itemQuantity">
                    <p> Item Name </p>
                </article>
                <article class="itemQuantity">
                    <p> Qty. </p>
                </article>
                <article class="itemQuantity">
                    <p> Price </p>
                </article>
                <article class="itemQuantity">
               <p> Total </p>
            </article>
            </article>

         <div class="ItemQuantityContent" v-for="item in items" :key="item.id">
            <form class="itemForm">
                <input v-model="item.name" id="innerItem" class="innerItemName">
                <input v-model="item.quantity" ref="itemQuantity" class="innerItemQuantity">
                <input v-model="item.price" ref="itemPrice" class="innerItemPrice">
                <form class="itemFormTotal">
                    <input v-model="item.total" ref="itemTotal" class="innerItemTotal">
                    <img :src="deleteIcon" alt="delete-icon" @click="removeItem(item.name)">
                </form>
            </form>
        </div>

       <button class="btn itemListBtn" @click="addItem"> + Add New Item </button>
    </section>
        <ErrorContent />      
    </div>
</section>
  
</template>

<script>




import deleteIcon from '../assets/delete.png'
import ErrorContent from './ErrorContent.vue'
import { store } from './store'



export default {

    props:{
        formContents: Object,
        formItems:Array
    },

    components:{
        ErrorContent
    },

    data(){
        return{
            formContent:this.formContents,
            itemContainer: true,
            deleteIcon: deleteIcon,
            items: this.formItems,
            store

        }
    },

    methods:{
        getEachInvoice(){
            let activeInvoice = JSON.parse(localStorage.getItem('Each Invoice'));
            this.forms = [...activeInvoice];
            this.getItemNames(activeInvoice)
        },

        getItemNames(invoice){
            let invoiceItem = invoice.map(item => {
                const {items} = item;
                return items;
            })

            this.items = [...invoiceItem[0]];
        },
        addItem(){
           const newItems = {
               name: '',
               total: '',
               quantity: '',
               price: ''
           }
            this.items.push(newItems)
        },

        removeItem(item){
            this.items = this.items.filter(t => t.name !== item)
            if(this.items.length < 1){
                this.itemContainer = false;
            }
        }
    },

    created(){
        this.getEachInvoice();
    },

    mounted(){
        const itemQty = this.$refs.itemQuantity
        const itemPrice =  this.$refs.itemPrice
        const itemTotal = this.$refs.itemTotal
        store.calculateTotal(itemQty, itemPrice, itemTotal)
    }

}
</script>

<style>

</style>