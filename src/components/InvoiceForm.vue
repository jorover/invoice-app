<template>
<section :class="formContent.formContainer">
        <div v-if="store.formCheck">  
            <EditForm :formContents="formContent"
            :formItems="items" />
         </div>

         <div v-else>
             <CreateForm 
             :formContents="formContent" 
             :inputForm="inputForm"
             :formItems="items" />
         </div>

        <section class="btnGroupContainer" v-if="store.formCheck">
                <div class="container btnGroup">
                <button class="btn discard"> Discard </button>
                <aside class="sideBtnGroup innerSideBtnGroup">
                    <button class="btn innerSaveCancel" @click="removeCreateForm"> Cancel </button>
                    <router-link :to="route">
                        <button class="btn active innerSaveCancel" @click="createdForm"> Save Changes </button>
                    </router-link>
                </aside>
                </div>
        </section>

         <section class="btnGroupContainer" v-else>
                <div class="container btnGroup">
                    <button class="btn innerBtn" @click="removeCreateForm"> Discard </button>
                    <aside class="sideBtnGroup">
                        <button class="btn innerBtn" @click="createdForm"> Save as Draft </button>
                        <button class="btn active innerBtn" @click="createdForm"> Save & Send </button>
                    </aside>
                </div>
        </section>
  </section>
</template>

<script>

import ItemList from '../components/ItemList.vue'
import CreateForm from './CreateForm.vue'
import EditForm from './EditForm.vue'
import { store } from './store'

const alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
const months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
const date = new Date();
const today = date.getDate();
const month = date.getMonth();
const dateMonth = months[date.getMonth()];
const dateYear = date.getFullYear();
let allItems = JSON.parse(localStorage.getItem('All Items'));
let localData = [];


export default {
    props:{
        invoices: Array,
        countInvoice: String
    },

    data(){
        return{
            formContent: {
                formHeader: 'Create Account',
                formContainer: 'formContainer',
                formContent: 'formContent',
                formControl: 'formControl',
                formAddressContent: 'formAddressContent',
                streetAddress: 'Street Address',
                city: 'City',
                postCode: 'PostCode',
                country: 'Country',
                invoiceContent: 'invoiceContent',
            },
            inputForm : {
                inputOne:'',
                inputTwo:'',
                inputThree:'',
                inputFour:'',
                inputFive:'',
                inputSix:'',
                inputSeven:'',
                inputEight:'',
                inputNine:'',
                inputTen:'',
                inputEleven: '',
                inputTwelve:'',
                inputThirteen:'',
                inputFourteen:'',
                inputFifteen: ''
            },
            items: [],
            innerItems: [],
            inputDate: 'text',
            inputFocus: 'date',
            itemTotal: '',
            formError: 'formError',
            itemError: 'itemError',
            checkArry: JSON.parse(localStorage.getItem('Each Invoice')),
            count: this.countInvoice,
            store,
            route: ''
        }
    },

    components:{
        ItemList,
        CreateForm,
        EditForm
    },

    methods:{
        removeCreateForm(){
            document.body.classList.remove('createForm')
            this.resetValues();
        },

        generateId() {
            let firstAlphabet = alphabets[Math.round(Math.random() * numbers.length)];
            let secondAlphabet = alphabets[Math.round(Math.random() * numbers.length)];
            let invoiceNum = '';
            for (let index = 0; index <=3; index++) {
               invoiceNum+= Math.round(Math.random() * index)                
            }

            if(firstAlphabet === undefined){
                firstAlphabet = alphabets[Math.round(Math.random() * numbers.length)] 
                return `${firstAlphabet}${secondAlphabet}${invoiceNum}`
            } else if(secondAlphabet === undefined){
                secondAlphabet = alphabets[Math.round(Math.random() * numbers.length)]
                return `${firstAlphabet}${secondAlphabet}${invoiceNum}`
            } else {
                return `${firstAlphabet}${secondAlphabet}${invoiceNum}`
            }
        },

        createdForm(event){
            const checkEve = event.target;
            const checkName = document.querySelectorAll('#itemName');
            const checkQuantity = document.querySelectorAll('#itemQuantity');
            const checkPrice = document.querySelectorAll('#itemPrice');
            const checkTotal = document.querySelectorAll('#itemTotal');
            const checkInnerName = document.querySelectorAll('.innerItemName');
            const checkInnerQuantity = document.querySelectorAll('.innerItemQuantity');
            const checkInnerPrice = document.querySelectorAll('.innerItemPrice');
            const checkInnerTotal = document.querySelectorAll('.innerItemTotal');
            const formDetails = {
                id:this.generateId(),
                createdAt: this.inputForm.inputEleven === '' ? this.todayDate(): this.inputForm.inputEleven,
                paymentDue: this.inputForm.inputFourteen,
                description: this.inputForm.inputTwelve,
                paymentTerms: this.inputForm.inputThirteen === '' ? 30 : parseFloat(this.inputForm.inputThirteen),
                clientName: this.inputForm.inputFive,
                clientEmail: this.inputForm.inputSix,
                status: this.inputForm.inputFifteen,
                senderAddress: {
                street: this.inputForm.inputOne,
                city: this.inputForm.inputTwo,
                postCode:this.inputForm.inputThree,
                country: this.inputForm.inputFour
                },
                clientAddress: {
                    street: this.inputForm.inputSeven,
                    city: this.inputForm.inputEight,
                    postCode: this.inputForm.inputNine,
                    country: this.inputForm.inputTen
                },
                items: this.innerItems,
                total: this.itemTotal

            }

             if(event.target.innerText === 'Save as Draft'){  
                this.checkPaymentStatus(formDetails.createdAt, formDetails.paymentDue, formDetails.paymentTerms, formDetails, checkEve);
                this.updateAllItems(formDetails);
                this.removeCreateForm();
                
            }

            if(event.target.innerText === 'Save & Send') {
                this.checkPaymentStatus(formDetails.createdAt, formDetails.paymentDue, formDetails.paymentTerms, formDetails);
                this.createInnerForm(checkName, checkQuantity, checkPrice, checkTotal);
                this.saveSend(formDetails);
            }

            if(event.target.innerText === 'Save Changes'){
                this.createInnerForm(checkInnerName, checkInnerQuantity, checkInnerPrice, checkInnerTotal)
                this.saveSend();
            }
        },

        updateAllItems(formDetails){
            if(allItems === null){
                let newAllItems = JSON.parse(localStorage.getItem('All Items'));
                let newArry = [...newAllItems, formDetails];
                this.invoices[0] = newArry
                formDetails.items = JSON.parse(localStorage.getItem('Items'))
                localStorage.setItem('All Items', JSON.stringify(newArry));

            } else {
                localData.push(formDetails)
                let newArry = [...allItems, ...localData];
                this.invoices[0] = newArry
                formDetails.items = JSON.parse(localStorage.getItem('Items'))
                localStorage.setItem('All Items', JSON.stringify(newArry));
            }
            
            store.count = this.invoices[0].length
            this.resetValues();
            location.reload();
        },

        createInnerForm(name, quantity, price,total){
            const checkName = name;
            const checkQuantity = quantity;
            const checkPrice = price;
            const checkTotal = total;
            const formArry = [];
            const totalArry = [];
            for (let index = 0; index < checkName.length; index++) {
                const eachItem = {
                    name: checkName[index].value,
                    quantity: parseFloat(isNaN(checkQuantity[index].value) === true ? 0 : checkQuantity[index].value),
                    price: parseFloat(isNaN(checkPrice[index].value) === true ? 0 : checkPrice[index].value),
                    total: parseFloat(isNaN(checkTotal[index].value) === true ? 0 : checkTotal[index].value)
                }
                
                formArry.push(eachItem)
            }
            
            this.innerItems = formArry;
            this.innerItems.map(item => item.price).forEach(item => {
                totalArry.push(parseFloat(item))
            })
            localStorage.setItem('Items', JSON.stringify(this.innerItems))
            this.checkTotalValue(this.itemTotal, totalArry);
        },

        checkPaymentStatus(createdDate, paymentDate, paymentTerms, formDetails, checkEve){ 
            const firstMonthNum = createdDate.charAt(5);
            const secondMonthNum = createdDate.charAt(6);
            const firstDayNum = createdDate.charAt(8);
            const secondDayNum = createdDate.charAt(9);
            let totalDay = parseFloat(`${firstDayNum}${secondDayNum}`) + parseFloat(paymentTerms);
            let totalMonth = parseFloat(`${firstMonthNum}${secondMonthNum}`);

            if(totalDay >= 31){
                let newDay = totalDay - 30;
                let newMonth = totalMonth + 1;
                let updatedDay = newDay < 9 ? newDay = `0${newDay}` : newDay = newDay;
                let updatedMonth = newMonth < 10 ? newMonth = `0${newMonth}`: newMonth = newMonth;
                if(updatedMonth > 12){
                    updatedMonth = `0${1}`
                    paymentDate = `${dateYear}-${updatedMonth}-${updatedDay}`
                } else {
                    paymentDate = `${dateYear}-${updatedMonth}-${updatedDay}`
                }
            } else {
                let updatedDay = totalDay < 9 ? totalDay = `0${totalDay}` : totalDay = totalDay;
                let updatedMonth = totalMonth < 10 ? totalMonth = `0${totalMonth}` : totalMonth = totalMonth;
                paymentDate = `${dateYear}-${updatedMonth}-${updatedDay}`
            }

            formDetails.paymentDue = paymentDate;
            this.checkStatus(formDetails, checkEve)
        },

        checkStatus(formDetails, a){
            if(a === undefined){
                formDetails.status = formDetails.paymentTerms === 1 ? 'paid' : 'pending'
            } else {
                formDetails.status = 'draft'
            }
        },

        checkTotalValue(item, totalArry) {
            if(totalArry.length < 1){
                this.itemTotal = 0
            } else if(totalArry.length >=1) {
                item = totalArry.reduce((totalVal, val) => totalVal + val)
            }

            this.itemTotal = item;
        },

        changeToDate(){
            this.inputDate = this.inputFocus
        },

        saveSend(formDetails){
            const inputForms = document.querySelectorAll('.checkInputValues');
            const editInput = document.querySelectorAll('.inputValues');
            const checkItems = inputForms.length === 0 ? editInput : inputForms;
            const itemsArray = this.items.length === 0 ? this.innerItems : this.items;
            const testArray = [];
            Array.from(checkItems, item => {  
                if(item.value === '' && itemsArray.length >= 1){
                    item.parentElement.classList.add('formCheck');
                    store.checkForErrors('firstTest', 'secondTest', 'thirdTest');
                } else if(item.value === '' && itemsArray.length < 1){
                   item.parentElement.classList.add('formCheck');
                   store.checkForErrors('itemCheck', 'itemCheck');
               } else if(item.value.length >= 1 && itemsArray.length < 1){
                    store.checkForErrors();
               } else if(item.value.length >= 1 && itemsArray.length >= 1){
                    testArray.push(true)
               } else if(item.value.length >= 1) {
                    item.parentElement.classList.remove('formCheck');
               }
           })

           if(!testArray.includes(false) && testArray.length === 12){      
               formDetails === undefined ? this.saveChanges():this.updateAllItems(formDetails)
               this.removeCreateForm();
           } 
        },

        checkFocusBlur(){
            const inputForms = document.querySelectorAll('.checkInputValues');
            const editInput = document.querySelectorAll('.inputValues');
            const checkItems = inputForms.length === 0 ? editInput : inputForms;
            Array.from(checkItems, item => {
                item.addEventListener('blur', ()=> {
                    if(item.value.length < 1){
                        item.parentElement.classList.remove('blurError');
                        item.parentElement.classList.add('formCheck');
                    }
                })

                item.addEventListener('keyup', ()=> {
                    if(item.value.length > 1){
                        item.parentElement.classList.remove('formCheck');
                        item.parentElement.classList.remove('blurError')
                    } else {
                        item.parentElement.classList.add('formCheck');
                    }
                })

                item.addEventListener('focus', ()=> {
                    if(item.value.length < 1){
                        item.parentElement.classList.add('blurError')
                    }
                })
            })
        },

        resetValues(){
           for(let item in this.inputForm){
               this.inputForm[item] === '' ? this.inputForm[item] = '' : this.inputForm[item] = ''
           }
        },

        todayDate(){
            let updatedDay = today < 10 ? `0{today}` : today;
            let updatedMonth = month < 10 ? `0${month + 1}` : month + 1;
            if(updatedMonth > 12){
                updatedMonth = `0${1}`
                return `${dateYear}-${updatedMonth}-${updatedDay}`
            } else {
                return `${dateYear}-${updatedMonth}-${updatedDay}`
            }
            
        },

        saveChanges(){
            const allInvoices = JSON.parse(localStorage.getItem('All Items'))
            const eachInvoice = JSON.parse(localStorage.getItem('Each Invoice'))
            const [invoice] = eachInvoice;
            let newCreatedAt = document.querySelector('.inputDate').value;
            let newPaymentTerms = document.querySelector('.paymentTerms').value;
            let newPaymentDue = '';
            let newInputDate = document.querySelector('.inputDate').value;
            const {id, status, createdAt, paymentDue, paymentTerms, total} = invoice;
             const formDetails = {
                id:id,
                createdAt: newCreatedAt === '' ? createdAt : newCreatedAt,
                paymentDue: newPaymentDue === '' ? paymentDue : newPaymentDue,
                description: document.querySelector('.description').value,
                paymentTerms: newPaymentTerms === '' ? newPaymentTerms = paymentTerms : parseFloat(newPaymentTerms),
                clientName: document.querySelector('.clientName').value,
                clientEmail: document.querySelector('.clientEmail').value,
                status: this.status === '' ? status : this.status,
                senderAddress: {
                street: document.querySelector('.senderStreet').value,
                city: document.querySelector('.senderCity').value,
                postCode: document.querySelector('.senderPostCode').value,
                country: document.querySelector('.senderCountry').value
                },
                clientAddress: {
                    street: document.querySelector('.clientStreet').value,
                    city: document.querySelector('.clientCity').value,
                    postCode: document.querySelector('.clientPostCode').value,
                    country: document.querySelector('.clientCountry').value
                },
                items: JSON.parse(localStorage.getItem('Items')),
                total: this.itemTotal === '' ? total : this.itemTotal         

             }
            
             this.checkPaymentStatus(newInputDate, newPaymentDue, newPaymentTerms, formDetails);
             this.saveEditedForm(allInvoices, formDetails);
              this.route = '/'
        },

        saveEditedForm(allInvoices, formDetails){
            let updatedArry = allInvoices.map(item => item.id === formDetails.id ? formDetails:item);
            return localStorage.setItem('All Items', JSON.stringify(updatedArry))
        }
    },

    mounted(){
        this.checkFocusBlur();
        store.formCheck = false
    }

}
</script>

<style>

.active{
    text-decoration: none;
}

</style>