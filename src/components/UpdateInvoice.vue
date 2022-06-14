<template>
  <section class="updateInvoiceContainer">
      <div class="innerInvoiceContainer" v-for="item in eachItem" :key="item.id">
        <BackHome />
        <header class="updateInvoiceHeader">
                <article class="paidBg statusContent">
                    <p> Status </p>
                    <li class="innerStatus"> {{ item.status }} </li>
                </article>

                <div class="btnInnerGroup headerFooterGroup">
                    <button class="btn" id="edit" ref="editBtn" @click="editForm"> Edit </button>
                    <button class="btn" id="del" @click="displayModal"> Delete </button>
                    <router-link to="/" class="btn" id="paid" v-if="markPaid" @click="changeStatus"> Mark as Paid </router-link>
                </div>
        </header>

        <section class="updateInvoiceContent">
            <div class="container">
            <header class="updateInvoicetagAddress">
                <article class="tagContent">
                    <h3> #{{ item.id }} </h3>
                    <p> {{ item.description }} </p>
                </article>

                <div class="addressGroup">
                   <p> {{ item.senderAddress.street }} </p>
                   <p> {{ item.senderAddress.city }} </p>
                   <p> {{ item.senderAddress.postCode}} </p>
                   <p> {{ item.senderAddress.country }} </p>
                </div>
            </header>

            <section class="updateInvoicedate">
                <article class="invoiceDueDate">
                    <article class="invoiceDates">
                        <p> Invoice Date </p>
                        <h4>{{ store.paymentDue(item.createdAt) }} </h4> 
                    </article>

                    <article class="invoiceDates">
                        <p> Payment Due </p>
                        <h4> {{ store.paymentDue(item.paymentDue) }} </h4>
                    </article>
                </article>

                <article class="invoiceBillingAddress">
                    <p> Bill To </p>
                    <h4> {{ item.clientName }}</h4>
                    <p> {{ item.clientAddress.street }} </p>
                    <p> {{ item.clientAddress.city }} </p>
                    <p> {{ item.clientAddress.postCode }} </p>
                    <p> {{ item.clientAddress.country }} </p>
                </article>

                <article class="invoiceShippingAddress">
                    <p> Sent to </p>
                    <h4> {{ item.clientEmail }}</h4>
                </article>
            </section>

            <section class="invoicePaymentDetails">

                <article class="itemQuantityContainer innerItemQuantityContainer">
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

                <article v-for="{name, quantity, price, total } in item.items" :key="total" class="innerItemDetails">
                    <p> {{ name }} </p>
                    <p> {{ quantity }} </p>
                    <p> £{{ price }} </p>
                    <p> £{{ total }} </p>
                </article>

            </section>

            <footer class="amountdueContainer">
                <p> Amount Due </p>
                <p> Hello </p>
                <p> hello </p>
                <p> £{{ item.total }} </p>
            </footer>
            </div>
        </section>

         <footer class="updateInvoiceHeader footerInvoiceHeader">
                <div class="btnInnerGroup">
                    <button class="btn" id="edit" ref="editBtn" @click="editForm"> Edit </button>
                    <button class="btn" id="del" @click="displayModal"> Delete </button>
                    <router-link to="/" class="btn" id="paid" v-if="markPaid" @click="changeStatus"> Mark as Paid </router-link>
                </div>
        </footer>
    </div>
  </section>
</template>

<script>

import BackHome from './BackHome.vue'
import { store } from './store'


export default {
    
    components:{
        BackHome
    },

    data(){
        return {
            eachItem: [],
            id: 0,
            markPaid:false,
            store
        }
    }, 

    methods:{
        retrieveInvoice(){
            let invoice = JSON.parse(localStorage.getItem('Each Invoice'));
            let status = invoice.map(item => item.status);
            let [a] = status
            this.eachItem = [...invoice];
            this.markAsPaid(a);
            store.paymentDue() 
        },

        editForm(){
            document.body.classList.add('createForm');
        },
        
        markAsPaid(a){
            if(a === 'draft' || a === 'pending'){
                this.markPaid = true
            }
        },

        changeStatus(){
            let status = document.querySelector('.innerStatus')
            status.innerText = 'Paid'
            status.parentElement.classList.remove('pendingBg', 'draftBg');
            this.markPaid = false;
            this.status();
            this.updateInvoice();
            store.formCheck = false
            
        },

        status(){
            let statusValue = document.querySelector('.innerStatus');
            if(statusValue.innerText === 'Pending'){
                statusValue.parentElement.classList.add('pendingBg');
            } else if(statusValue.innerText === 'Paid'){
                statusValue.parentElement.classList.add('paidBg')
            } else {
                statusValue.parentElement.classList.add('draftBg')
            }
        },

        displayModal(){
            document.body.classList.add('displayModal');
        },

        updateInvoice(){
            const allInvoices = JSON.parse(localStorage.getItem('All Items'));
            const [ a = eachInvoice] = JSON.parse(localStorage.getItem('Each Invoice'));
            a.status = 'paid'
            const updated = allInvoices.map(item => item.id === a.id ? a : item);
            localStorage.setItem('All Items', JSON.stringify(updated))
            return updated
        }
    },

    mounted(){
        this.retrieveInvoice();
    },

    updated(){
        this.status();
        store.formCheck = true
    }
}
</script>

<style>

.updateInvoiceContainer{
    position:absolute;
    top:100px;
    width:55%;
    left:27%;
    height: fit-content;
    color:#fff;
    justify-content: space-between;
    padding-bottom: 50px;

}

.innerInvoiceContainer, .updateInvoiceContent{
    width:100%;
}

.updateInvoiceContainer, 
.updateInvoiceHeader, 
.btnInnerGroup{
    display:flex;
}


.updateInvoiceHeader{
    width:100%;
    height:100px;
    margin-top:20px;
}

.updateInvoiceHeader, 
.updateInvoiceContent{
    background:rgb(30, 33, 57);
    border-radius:20px;
}

.updateInvoiceHeader, 
.statusContent, 
.updateInvoicetagAddress, 
.updateInvoicedate{
    display:flex;
    justify-content: space-between;
}

.statusContent, .btnInnerGroup{
     width:35%;
     height:100px;
     align-items:center;
     justify-content: space-around;
}

.statusContent p{
    padding:10px;
}

.paidBg .innerStatusContainer{
    background:red;
}


#edit, #del, #paid{
    border-radius: 30px;
    width:95px;
    margin:0px;
}

#edit{
    margin-right:8px;
    background:rgb(99, 102, 128);
}

#del{
    background: rgb(255, 54, 54);
}

.status{
    text-transform: capitalize;
}

.updateInvoiceContent{
    min-height:400px;
    margin-top:40px;
    padding-bottom:20px;   
}

.updateInvoicetagAddress{
    align-items:center;
}

.updateInvoicedate{
    margin:50px 0px;
    min-height:150px;
}

.invoicePaymentDetails{
    width:100%;
    margin:auto;
    text-align:center;
}

.invoicePaymentDetails{
    background: rgb(37, 41, 69);
    transition: background 0.3s ease 0s;
}

.light .invoicePaymentDetails{
    background: rgb(248, 248, 251);
    color: #000;
}

.innerItemDetails, .amountdueContainer{
    padding:15px 0px;
}

.amountdueContainer{
    background:#000;
    height: 5rem;
    text-align:center;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
}

.amountdueContainer p{
    margin:10px 0px;
}

.amountdueContainer p:nth-child(2), 
.amountdueContainer p:nth-child(3){
    visibility: hidden;
}

.amountdueContainer p:nth-child(4){
    font-size: 1.5rem;
}


.tagContent p, .addressGroup p, .invoiceDates p:nth-child(1), 
.invoiceBillingAddress p, .invoiceShippingAddress p:nth-child(1){
    color: rgb(133, 139, 178);
    font-size: 1rem;
    line-height:1.4;
}

.invoiceBillingAddress p:nth-child(2){
    color:#fff;
    margin-top:0.5rem;
}

.invoiceDates:nth-child(2){
    margin-top:30px;
}

.addressGroup{
    padding-top:20px;
}

.btnInnerGroup{
    width:fit-content;
    margin-right:20px;
}

#paid{
    width:150px;
    margin-left:5px;
    background: rgb(124, 93, 250);
    text-decoration: none;
}

.footerInvoiceHeader{
    display:none;
}

.headerFooterGroup{
   text-align:center; 
}

.footerInvoiceHeader .btnInnerGroup{
    float:right;
    text-align:center;
}

@media (max-width: 1100px){
    .updateInvoiceContainer{
        width: 70%;
        left: 20%;
    }
}

@media (max-width: 900px){
    .updateInvoiceContainer{
        width: 80%;
        left: 10%;
    }
}

@media (max-width: 768px){
    .updateInvoiceContainer{
        width: 95%;
        left: 2%;
    }
}

@media (max-width: 600px){
    .footerInvoiceHeader{
        display:block;
    }
    
    .headerFooterGroup{
        display:none;
    }

    .statusContent{
        width:100%;
        justify-content: space-between;
    }

    .updateInvoicetagAddress{
        flex-direction: column;
        align-items: flex-start;
        padding-top:10px;
    }

    .updateInvoicedate{
        display:grid;
        grid-template-columns: auto auto;
        grid-gap: 10px;
    }
}

@media (max-width: 550px){
    .innerItemQuantityContainer {
        display:none
    }

    .innerItemDetails p:nth-child(2),
     .innerItemDetails p:nth-child(3){
         visibility: hidden;
     }

}

@media (max-width: 480px){
    .innerItemDetails, .amountdueContainer{
       grid-template-columns: 2fr 1fr 1fr 1fr;
    }

    .footerInvoiceHeader .btnInnerGroup{
        width:90%;
        margin:0;
    }
}


@media (max-width: 400px){
    .footerInvoiceHeader .btnInnerGroup{
        width:100%;
        margin:0;
    }
}

@media (max-width: 310px){
    .innerItemDetails, .amountdueContainer{
       grid-template-columns: 4fr 1fr 1fr 1fr;
       padding:10px;
    }
}





</style>