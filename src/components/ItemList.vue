<template>
    <section class="itemListContainer">
       <h3> Item List </h3>
       <article class="itemQuantityContainer" v-if="showItem">
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

        <div class="ItemQuantityContent" v-for="item in newItems" :key="item.id">
            <form class="itemForm">
                <input v-model="item.itemName" id="itemName">
                <input v-model="item.itemQty" id="itemQuantity" ref="itemQuantity">
                <input v-model="item.itemPrice" id="itemPrice" ref="itemPrice">
                <form class="itemFormTotal">
                    <input v-model="item.itemTotal" id="itemTotal" ref="itemTotal">
                    <img :src="deleteIcon" alt="delete-icon" @click="removeItem(item)">
                </form>
            </form>
        </div>

        <button class="btn itemListBtn" @click="addItem"> + Add New Item </button>
    </section>
  
</template>

<script>

import deleteIcon from '../assets/delete.png'
import { store } from './store'





export default {

    props:{
        item: Array,
        itemError: String
    },

    data(){
        return{
            deleteIcon: deleteIcon,
            itemName: '',
            itemQty: '',
            itemPrice: '',
            itemTotal: '',
            newItems: this.item,
            showItem: false,
            changeError: this.itemError,
            store
        }
    },

    methods:{
        addItem(){
            const eachItem = {
                itemName: this.itemName,
                itemQty: this.itemQty,
                itemPrice: this.itemPrice,
                itemTotal: this.itemTotal,
            }
        this.showItem = true;
        this.newItems.push(eachItem)
        document.querySelector('.errorContent').style.display = 'none';
        console.log(this.newItems)

        },

        removeItem(item){
            this.newItems = this.newItems.filter(t => t !== item);
            if(this.newItems.length < 1){
                this.showItem = false;
            }
        console.log(this.newItems)
    }
    }, 

    updated(){
        const itemQty = document.querySelectorAll('#itemQuantity')
        const itemPrice =  document.querySelectorAll('#itemPrice')
        const itemTotal = document.querySelectorAll('#itemTotal')
        store.calculateTotal(itemQty, itemPrice, itemTotal);
    }

}




</script>

<style>

</style>