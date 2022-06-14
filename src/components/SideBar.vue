<template>
    <section :class="sideBar">
        <figure :class="logo">
            <img :src="logoImg" alt="invoice-logo">
        </figure>

        <figure :class="moonSunContainer">
            <img :src="sunImg" alt="sun-logo" class="mode sun" @click="colorMode">
            <img :src="moonImg" alt="moon-logo" class="mode moon" @click="colorMode">
        </figure>
    </section>
  
</template>

<script>

import LogoImg from '../assets/iv.png'
import MoonImg from '../assets/moon.png'
import SunImg from '../assets/sun.png'
import { store } from './store'


export default {
    name: 'SideBar',
    data(){
        return{
            sideBar: "sideBarContainer",
            logo: "logoContainer",
            moonSunContainer: "moonSunContainer",
            logoImg: LogoImg,
            moonImg: MoonImg,
            sunImg: SunImg,
            store
        }
    },

    methods:{
        colorMode(event){
            const switchMode = event.target.classList;
            const colorMode = document.querySelectorAll('.mode');
            if(switchMode.contains('moon')){
               store.moonMode(colorMode)
            } else {
                store.sunMode(colorMode)
            }         
        },

        setColorMode(){
        const colorMode = document.querySelectorAll('.mode');
        const mode = localStorage.getItem('mode')
        
        if(mode === 'dark'){
            store.moonMode(colorMode)
        }

        if(mode === 'light'){
            store.sunMode(colorMode)
        }

        if(mode === null){
            return localStorage.setItem('mode', 'dark')
        }
    }

    },

    mounted(){
        this.setColorMode();
    }
}


</script>

<style>



</style>