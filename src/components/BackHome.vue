<template>
        <router-link to='/' :class="link" @click="store.removeEachInvoice()"> Go Back </router-link>
</template>

<script>

import { store } from './store'



export default {
     data(){
        return{
           link: 'home',
           store
        }
     }


}

</script>

<style>

.home{
   color:#fff;
   text-decoration: none;
   padding:10px;
   transition: 0.2s;
}

.light .home{
   color:rgb(133, 139, 178)
}

.home:hover{
    color: rgb(185, 185, 185);
}

</style>