<template>
  <section>
    <SideBar />
    <router-view />
  </section>
</template>

<script>


import SideBar from './components/SideBar.vue'


export default {
  components:{
    SideBar
  } 
}

</script>

<style>

:root{
  --body-bgColor: rgb(20, 22, 37);
}

*{
  margin:0;
  padding:0;
  box-sizing: border-box;
}

body{
  background: var(--body-bgColor);
}

.container{
  width:90%;
  margin:auto;
}

.invoiceContainer{
  display:flex;
}

.sideBarContainer{
  width:10%;
  position:fixed;
  height:100vh;
  background:rgb(30, 33, 57);
  z-index:1;
}

.logoContainer{
  border-radius: 20px;
  background: rgb(124, 93, 250);
}

.logoContainer, .moonSunContainer{
  text-align: center;
  min-height: 100px;
}

.logoContainer img{
  width:50px;
  height:50px;
  position:relative;
  transform: translateY(50%);
}

.moonSunContainer img{
  width:25px;
  height:25px;
  margin:auto;
  transform: translateY(400px);
  cursor: pointer;
}

.sun{
  display:block;
}

.moon{
  display:none;
}


.formContainer{
  color:#fff;
  width:0%;
  height:100vh;
  overflow: hidden;
  position:fixed;
  top:0px;
  left:10%;
  z-index:1;
  background: var(--body-bgColor);
  transition: 0.2s;
}

.light .formContainer{
  background: #fff;
}

.createForm .formContainer, .editForm .updateForm{
  width:45%;
}


.formContainer h2{
  margin: 30px 0 10px 0px;
  font-size: 2rem;
  line-height: 1.4;
  letter-spacing: 1.3px;
}

.light .formContainer h2, .light .itemListContainer h3{
  color: #000;
}

.scrollContainer{
  overflow:scroll;
  padding:20px;
  position:relative;
  height:90vh;
}

.formContent{
  margin-top:35px;
}

.formControl{
  display:flex;
  flex-direction: column;
  margin: 15px 0px;
}

.formControl input, .formControl select, .itemForm input, .itemForm form input{
  padding:17px;
  width:100%;
  background:rgb(30, 33, 57);
  border:none;
  margin:10px 0px;
  color:#fff;
  border-radius:7px;
}

.light .formControl input, .light .formControl select, .light .itemForm input, .light .itemForm form input{
  background: #fff;
  border:0.2px solid rgb(124, 93, 250);
  color: #000;
}

.light .formControl input::placeholder{
  opacity:1;
  color: #000;
}

.formControl input:focus, .itemForm input:focus{
  outline:none;
}

label{
  color:rgb(226, 226, 226)
}

.light label, .light .itemQuantityContainer p{
  color: rgb(133, 139, 178);
}

.light .itemListBtn {
  background: rgb(248, 248, 251);
  color: #000;
}

.light .updateInvoiceHeader, 
.light .updateInvoiceContent{
  background:#fff;
  box-shadow: 1px 2px 3px 1px #eee;
}

.light .updateInvoiceHeader p, 
.light .tagContent h3, 
.light .updateInvoiceContent h4{
  color:#000;
}

h5{
  color: rgb(124, 93, 250);
  font-size: 0.9rem;
  line-height: 1.3;
}

.formControl input::placeholder{
  color:#fff;
  opacity:1;
}

.formAddressContent{
  display:grid;
  grid-template-columns: auto auto auto;
  grid-gap:15px;
}

.invoiceContent{
  display:grid;
  grid-template-columns: auto auto;
  grid-gap:15px;
}

.btnGroupContainer{
  width:inherit;
  height: 10vh;
  position: fixed;
  background: rgb(20, 22, 37);
  border:1px solid red;
}

.light .btnGroupContainer{
  background:#fff;
}

.btnGroup{
  display:flex;
  justify-content: space-between;
  align-items: flex-end;
  height:inherit;
}

.innerSideBtnGroup{
  display:flex;
  justify-content: flex-end;
  float:right;
  width:100%;
}

.btn{
  background:rgb(30, 33, 57);
  padding:15px 20px;
  border-radius:40px;
  color:#fff;
  border:none;
  margin-bottom:15px;
  cursor: pointer;
}

.active{
  background: rgb(124, 93, 250);
  margin-left:8px;
}

.itemListContainer{
  margin:30px 0px;
  min-height:100px;
}

.itemListBtn{
  width: 100%;
}

.itemListBtn, .itemQuantityContainer{
 margin:20px 0px;
}

.itemQuantityContainer, .itemForm{
  display:grid;
  grid-template-columns: 3fr 1fr 1.5fr 2fr;
  grid-gap:7px;
  place-items: center;
}

.itemForm{
  grid-template-areas: 'itemName itemQty itemPrice itemTotal';
}


.innerItemQuantityContainer, .innerItemDetails, .amountdueContainer{
    display:grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap:7px;
    place-items: center;
}

.ItemQuantityContent, .itemForm input, .itemForm form{
  width:100%;
}

.itemForm form{
  display:flex;
  justify-content: space-between;
  align-items: center;
}

.itemForm form input{
  width:80%;
}

.itemForm form img{
  width:20px;
  height:20px;
  cursor: pointer;
}

.itemDisplayContainer{
  color:#fff;
  width:100%;
  position:absolute;
  margin:auto;
  top:0px;
  left:0px;
  height:650px;
  transition: 0.4s;
}

.global .itemDisplayContainer{
  opacity:0.7;
}

.itemFilterContainer, .newInvoiceContainer{
  display:flex;
  justify-content: space-between;
}

.itemFilterContainer, .invoicesContainer{
  margin:50px auto;
  width:60%;
  font-size: 1.2rem;
  position:relative;
  left:5%;
}

.itemFilterContainer, .invoicesContainer{
  padding:20px;
}

.itemFilterContainer h3{
  font-size: 2.3rem;
  line-height: 1.3;
  letter-spacing: 1.1px;
}

.itemFilterRightContent{
  width:50%;
  display:flex;
  justify-content: space-between;
  align-items:center;
}

.itemOverlay{
  width:100vw;
  height:100vh;
  position:fixed;
  top:0;
  width:45%;
  left:55%;
  background:black;
  opacity:0.3;
  display:none;
  z-index:1;
}

.createForm .itemOverlay, .editForm .updateOverlay{
  display:block;
}

.selectContainer select{
  padding:10px;
  background: rgb(20, 22, 37);
  color:#fff;
  border:none;
}

.light .selectContainer select, .light .modalContent{
  background: rgb(248, 248, 251);
  color: #000;
}

.selectContainer select:focus{
  outline:none;
}

.newInvoiceContainer{
  align-items:center;
}

.newInvoiceContainer{
  background: rgb(124, 93, 250);
  border-radius: 100px;
  height:50px;
  padding:7px 15px;
  margin:0px;
}

.circle{
  width:25px;
  height:25px;
  text-align: center;
  border-radius:100%;
  background: #fff;
  color:#000;
  margin-right:10px;
}

.circle p{
  font-size:1rem;
  transform: translateY(2px);
}

.eachInvoice, .innerEachInvoice{
  width:100%;
  margin:10px auto;
  min-height:30px;
  display:flex;
  justify-content: space-between;
  align-items:center;
  height:70px;
  background:rgb(30, 33, 57);
  padding:10px;
  font-size: 1.02rem;
  border-radius:10px;
  cursor:pointer;
}

.light .eachInvoice, .light .innerEachInvoice{
  background:rgb(255, 255, 255);
  color: rgb(133, 139, 178);
}

.light .eachInvoice p:nth-child(1), 
.light .eachInvoice p:nth-child(4),
.light .innerEachInvoice p:nth-child(1), 
.light .innerEachInvoice p:nth-child(4),
.light .itemFilterleftContent h3{
  color:#000;
}

.light .itemFilterleftContent p, 
.light .modalContent p{
  color: rgb(133, 139, 178);
}

.eachInvoice p, .eachInvoice h3, .eachInvoice li{
  width:20%;
}

.eachInvoice h3{
  text-align: center;
}

.eachInvoice .status, .innerStatus, .innerEachInvoice .status{
  text-transform: capitalize;
  padding:10px;
  width:100px;
  color: #fff;
  border-radius:10px;
}

.eachInvoice .status, .innerStatus{
    transform:translateX(-20px);
}

.innerEachInvoice{
    height: fit-content;
}
  
.innerEachInvoice article{
    width:25%;
}

.innerEachInvoice article:nth-child(2){
    text-align:center;
}

.innerEachInvoice .status{
    margin:auto;
}

.innerEachInvoice article p, .innerEachInvoice article li {
    margin:10px;
}

.paidBg .status, .paidBg .innerStatus{
  color: rgb(51, 214, 159);
  background: rgba(51, 214, 159, 0.06);
}

.pendingBg .status, .pendingBg .innerStatus{
  color: rgb(255, 143, 0);
  background: rgba(255, 143, 0, 0.06);
}

.draftBg .status, .draftBg .innerStatus{
  color: rgb(207, 203, 203);
  background: rgba(55, 59, 83, 0.06);
}

.innerStatus{
  width:100px;
  padding:10px;
  text-transform: capitalize;
}

.eachInvoice:hover, .innerEachInvoice:hover{
  border:0.5px solid rgb(124, 93, 250);
}

.invoiceBtn{
  border:none;
  background:none;
  color:rgb(124, 93, 250);
  font-size:1.2rem;
  cursor:pointer;
}

.innerItemQuantityContainer{
    margin:0px;
    padding:20px 0px;
}

.formCheck .checkInputValues, .formCheck .inputValues {
  border:1px solid rgb(255, 0, 0);
}

.formCheck label{
  color: rgb(255, 0, 0);
}

.formError, .itemList {
  font-size: 0.85rem;
}

.blurError .checkInputValues, .blurError .inputValues {
   border:0.5px solid rgb(124, 93, 250);
}

.blurError label{
  color:#fff;
}

.itemError{
  display:none;
}

.errorDisplay, .itemErrorDisplay{
  display:block;
}

.errorContent{
  width:fit-content;
  height:auto;
  padding:5px;
  color: rgb(255, 0, 0);
  display:none;
}

.deleteModal, .modaOverlay{
    position:fixed;
    top:0;
    left:0;
    width:100vw;
    height:100vh;
}

.deleteModal{
  transform:scale(0);
  transition:0.2s;
}

.modaOverlay{
  background:#000;
  opacity:0.7;
}

.modalContent{
  width:40%;
  min-height:250px;
  color:#fff; 
  background:rgb(30, 33, 57);
  position: absolute;
  z-index:1;
  left:35%;
  top:200px;
  padding:30px;
  border-radius:30px;
}

.modalContent h3{
  font-size: 1.85rem;
  letter-spacing: 1.5px;
  line-height:1.4;
}

.modalContent p{
  font-size: 1.1rem;
  margin:20px 0px;
}

.displayModal .deleteModal{
  transform:scale(1)
}

.discard{
  display:none;
}

#itemName, .innerItemName{
  grid-area: itemName
}

#itemQuantity, .innerItemQuantity{
  grid-area: itemQty
}

#itemPrice, .innerItemPrice{
  grid-area: itemPrice
}

.itemFormTotal{
  grid-area: itemTotal
}

.eachInvoice, .innerEachInvoice, .updateInvoiceContainer{
    animation-name: eachInvoice;
    animation-fill-mode: forwards;
    animation-duration: 1s;
    animation-delay: 0.2s;
    opacity:0;
}

@keyframes eachInvoice {
    0%{
        opacity:0
    }

    25%{
        opacity: 0.25
    }

     50%{
        opacity:0.50
    }

    70%{
        opacity: 0.75;
    }

     100%{
        opacity: 1
    }
}


@media (max-width: 1200px){
  .itemFilterContainer, .invoicesContainer{
    width: 70%;
  }

  .createForm .formContainer{
    width:55%;
  }

  .itemOverlay{
    left:65%;
  }
}

@media (max-width: 1000px){
  .itemFilterContainer, .invoicesContainer{
    width: 80%;
  }
}

@media (max-width: 900px){
  .itemFilterContainer, .invoicesContainer, .updateInvoiceContainer{
    position: relative;
    left: 0;
    top: 90px;
    width: 90%;
  }

  .sideBarContainer{
    width: 100vw;
    height: 85px;
    z-index: 1;
    display:flex;
    justify-content: space-between;
  }

  .logoContainer, .moonSunContainer{
    width:100px;
    min-height:80px;
  }

  .logoContainer img, .moonSunContainer img{
    width: 40px;
    height: 40px;
  }

  .moonSunContainer img{
    transform: translateY(20px);
  }

  .formContainer {
    left: 0%;
    top: 85px;
  }

  .itemOverlay{
    top:85px;
    left: 55%;
  }

  .modalContent{
    width:70%;
    left:15%;
  }

  .btnGroupContainer{
    bottom: 0px;
  }
  
  /*.scrollContainer{
    height: calc(100vh - 27vh);
  }*/
}


@media (max-width: 768px){
    /*.eachInvoice{
      display:none;
    }

    .innerEachInvoice{
      display:flex;
    }*/

    .createForm .formContainer{
      width:70%;
  }

  .itemOverlay{
    left: 70%;
  }
}


@media (max-width: 700px){
  .itemFilterRightContent{
    width: 60%;
  }
}



@media(max-width: 680px){
  .innerEachInvoice article:nth-child(1), .innerEachInvoice article:nth-child(2){
    width: 50%;
}

.innerEachInvoice article:nth-child(2){
  text-align:right;
}

.innerEachInvoice .status{
  float: right;
  text-align:center;
}

}


@media (max-width: 600px){
   .createForm .formContainer{
      width:100vw;
  }

  .itemOverlay{
    left:100%;
  }

  .modalContent{
    width:90%;
    left:5%;
  }
}

@media (max-width: 470px){
  .itemFilterContainer{
    flex-direction: column;
  }

  .itemFilterleftContent, .itemFilterRightContent{
    width:100%;
    margin:20px auto;
  }

  .itemFilterleftContent{
    text-align:center;
  }
}

@media (max-width: 420px){
  .formAddressContent, .invoiceContent{
    grid-template-columns: auto;
  }

  .btn{
    padding: 15px 20px;
  }

  .itemForm{
    display:grid;
    grid-template-areas: 
    'itemName itemName itemName itemName'
    'itemQty itemPrice itemPrice itemTotal';
  }

  .createForm .itemDisplayContainer{
  display:none;
}
}

@media (max-width: 380px){
  .btn{
    padding: 15px 15px;
  }
}

@media (max-width: 355px){
  .innerSideBtnGroup{
    width: 100%;
  }
}

@media (max-width: 350px){
  .innerBtn{
    width:90px;
    height: 60px;
  }
}

@media (max-width: 310px){
  .itemFilterRightContent{
    flex-direction: column;
  }

  .innerBtn{
    width:80px;
  }
}






</style>