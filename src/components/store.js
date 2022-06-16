import { reactive } from 'vue'



const months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];


export const store = reactive({
    count: 0,
    formCheck: false,
    removeEachInvoice(){
        this.formCheck = !this.formCheck
        return localStorage.removeItem('Each Invoice')
    },
    checkForErrors(a, b, c){
        const itemList = document.querySelector('.itemList');
        const errorContent = document.querySelector('.errorContent')
        const formError = document.querySelector('.formError');
        if((a && b) === 'itemCheck'){
            errorContent.style.display = 'block'
            itemList.style.display = 'block'
            formError.style.display = 'block'
        } else if((a && b && c) === undefined){
            errorContent.style.display = 'block'
            formError.style.display = 'none'
            itemList.style.display = 'block'
        } else if(a === 'firstTest' && b === 'secondTest' && c === 'thirdTest'){
            errorContent.style.display = 'block'
            itemList.style.display = 'none'
            formError.style.display = 'block'
        }

    },

    paymentDue(date){
        if(date !== undefined){
            const year = date.split('').filter(item => item !== '-').join('').slice(0, 4);
            const month = date.split('').filter(item => item !== '-').join('').slice(4, 6);
            const day = date.split('').filter(item => item !== '-').join('').slice(6, 8);
            const updatedMonth = months[parseFloat(month) - 1];
            return `${day} ${updatedMonth} ${year}`
        }
    },

    calculateTotal(itemQty, itemPrice, itemTotal){
        if((itemQty || itemPrice || itemTotal) === undefined){
            console.log('waiting');
        } else {
            const allQty = itemQty;
            const allPrices = itemPrice;
            const allTotal = itemTotal;
            console.log(allQty)
            
            for (let index = 0; index < allQty.length; index++) {
                const elementQty = allQty[index];
                const elementPrice = allPrices[index];
                const elementTotal = allTotal[index];
                elementQty.addEventListener('keyup', () => {
                    if(elementQty.value === ''){
                        elementTotal.value = elementPrice.value;
                    } else if(elementPrice.value == '') {
                        elementTotal.value = ''
                    } else {
                        let newTotal = parseFloat(elementQty.value) * parseFloat(elementPrice.value);
                        elementTotal.value = newTotal;
                    }

                    console.log('pink')
                })
    
                elementPrice.addEventListener('keyup', ()=> {
                    if(elementPrice.value === '' || elementQty.value === ''){
                        elementTotal.value = ''
                    } else {
                        let newTotal = parseFloat(elementPrice.value) * parseFloat(elementQty.value);
                        elementTotal.value = newTotal
                    }
                })
            }
        }
    },

    moonMode(colorMode){
        colorMode.forEach(item => {
            item.classList.contains('sun') ? item.style.display = 'block' : item.style.display = 'none'
         })
         this.addDark();
         
    },

    sunMode(colorMode){
        colorMode.forEach(item => {
            item.classList.contains('moon') ? item.style.display = 'block' : item.style.display = 'none'
         })
         this.addLight();
    },

    addLight(){
        document.body.classList.remove('dark')
        document.body.classList.add('light')
        document.body.style.background = 'rgb(248, 248, 251)'
        localStorage.setItem('mode', 'light')
    },

    addDark(){
        document.body.classList.remove('light')
        document.body.style.background = 'rgb(20, 22, 37)'
        localStorage.setItem('mode', 'dark')
    },

    defaultMode(){
        const mode = localStorage.getItem('mode');
        if(mode === null){
          return localStorage.setItem('mode', 'dark')  
        }
    }
})
