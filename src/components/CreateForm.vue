<template>
     <div class="container scrollContainer">
        <h2> {{ formContent.formHeader }} </h2>
        <form :class="formContent.formContent">
            <h5> Bill From </h5>
            <form :class="formContent.formControl">
                <label> {{ formContent.streetAddress }} </label>
                <input type="text" v-model="inputForms.inputOne" class="checkInputValues" >
            </form>
            <form :class="formContent.formAddressContent">
               <form :class="formContent.formControl">
                    <label> {{ formContent.city }} </label>
                    <input type="text" v-model="inputForms.inputTwo" class="checkInputValues">
                </form>
                <form :class="formContent.formControl">
                    <label> {{ formContent.postCode }} </label>
                    <input type="text" v-model="inputForms.inputThree" class="checkInputValues">
                </form>
                <form :class="formContent.formControl">
                    <label> {{ formContent.country }} </label>
                    <input type="text" v-model="inputForms.inputFour" class="checkInputValues">
                </form>
            </form>
        </form>

        <form :class="formContent.formContent">
            <h5> Bill To </h5>
            <form :class="formContent.formControl">
                <label> Client's Name </label>
                <input type="text" v-model="inputForms.inputFive" class="checkInputValues">
            </form>
            <form :class="formContent.formControl">
                <label> Client's Email </label>
                <input type="text" placeholder="e.g.@example.com" v-model="inputForms.inputSix" class="checkInputValues">
            </form>
            <form :class="formContent.formControl">
                <label> {{ formContent.streetAddress }} </label>
                <input type="text" v-model="inputForms.inputSeven" class="checkInputValues">
            </form>
            <form :class="formContent.formAddressContent">
               <form :class="formContent.formControl">
                    <label> {{formContent.city }} </label>
                    <input type="text" v-model="inputForms.inputEight" class="checkInputValues">
                </form>
                <form :class="formContent.formControl">
                    <label> {{ formContent.postCode }} </label>
                    <input type="text" v-model="inputForms.inputNine" class="checkInputValues">
                </form>
                <form :class="formContent.formControl">
                    <label> {{ formContent.country }} </label>
                    <input type="text" v-model="inputForms.inputTen" class="checkInputValues">
                </form>
            </form>

            <form :class="formContent.invoiceContent">
               <form :class="formContent.formControl">
                    <label> Invoice Date </label>
                    <input type="date" 
                    v-model="inputForms.inputEleven" 
                    id="formDate"
                    class="checkInputValues">
                </form>
                <form :class="formContent.formControl">
                    <label> Payment Terms </label>
                    <select v-model="inputForms.inputThirteen"> 
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
                    <input type="text" placeholder="e.g.Graphic Design Service" v-model="inputForms.inputTwelve" class="checkInputValues">
                </form>
        </form>

        <ItemList :item="items" :itemError="itemError" />
        <ErrorContent />
     </div>
</template>

<script>

import ItemList from '../components/ItemList.vue'
import ErrorContent from './ErrorContent.vue'


export default {

    props:{
        formContents: Object,
        inputForm: Object,
        formItems: Array
    },

    components:{
        ItemList,
        ErrorContent
    }, 

    data(){
        return {
            formContent:this.formContents,
            inputForms: this.inputForm,
            items: this.formItems,
            itemError: this.itemErrors,
            formError: this.formErrors
            
        }
    }

}
</script>

<style>

</style>