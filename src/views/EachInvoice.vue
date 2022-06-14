<template>
    <section>
        <InvoiceForm />
        <section class="itemOverlay updateOverlay" @click="removeClass"></section>
        <UpdateInvoice />
        <div class="deleteModal">
            <article class="modalContent">
                <h3> Confirm Deletion </h3>
                <p> Are you sure you want to delete invoice {{ invoiceNum() }}. This action cannot be undone </p>
                <div class="modalBtn">
                    <button class="btn" id="edit" @click="removeModal"> Cancel </button>
                    <router-link to="/" class="btn" id="del" @click="removeInvoice"> Delete </router-link>
                </div>
            </article>
            <div class="modaOverlay"></div>
        </div>
    </section>
</template>



<script>
import UpdateInvoice from '../components/UpdateInvoice.vue'
import InvoiceForm from '../components/InvoiceForm.vue'


export default {
    components:{
        UpdateInvoice, 
        InvoiceForm
    },

    data(){
        return{
            routing: ''
        }
    },

    methods:{
        removeClass(){
            document.body.classList.remove('createForm');
            document.body.classList.remove('editForm');
            document.querySelectorAll('.checkInputValues').forEach(item => {
                item.parentElement.classList.remove('formCheck');
                item.parentElement.classList.remove('blurError')
            })
        },

        invoiceNum(){
            const invoice = JSON.parse(localStorage.getItem('Each Invoice'))
            if(invoice === null) {
                console.log('waiting')
            } else {
                const newInvoice = invoice.map(item => item.id);
                const [num] = newInvoice;
                return num;
            }
        },

        removeModal(){
            document.body.classList.remove('displayModal');
        },

        removeInvoice(){
            const allInvoices = JSON.parse(localStorage.getItem('All Items'));
            const [a = invoice] = JSON.parse(localStorage.getItem('Each Invoice'));
            const removeItem = allInvoices.filter(item => {
                if(item.id !== a.id){
                    return item;
                }
            })
            localStorage.setItem('All Items', JSON.stringify(removeItem));
            this.removeModal();
        }
    }
}
</script>

<style>

.modalBtn{
    display:flex;
    justify-content: end;
    margin-top:20px;
}

#del{
    text-decoration: none;
}


</style>