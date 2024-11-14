async function get_cart_cards(){
    fetch('/cart_cards_mandi/').then(async (res) =>{
        var resp = await res.json();
        cart_details = resp["cart_details"]
        // console.log(resp)

        table = ""
        var totalCost = 0;
        cart_details.forEach((cart)=>{
            table += `
            <div class="grid lg:grid-cols-7 gap-x-1 gap-y-1 place-items-center text-2xl">
            
            <!--one line of cart Item-->     
            
                <span class="col-span-1 font-medium pr-3 text-2xl place-self-start"> ${cart.p_name}</span>
                <span class="col-span-2 font-medium pr-3 text-green-600 place-self-center">${cart.fname} ${cart.lname}</span>
                <span class="col-span-1 font-medium text-orange-400 ">${cart.user_rate}</span>
                <span class="col-span-1 font-medium text-orange-400 ">x${cart.quantity}</span>
                <span class="col-span-1 font-medium text-orange-400 ">₹${cart.cost}</span>
                <button type="submit" onclick='handleFormSubmission(${cart.p_id}, ${cart.w_id})' class="col-span-1 hover:scale-125 ease-in-out duration-500 inline-block p-1 text-lg font-semibold drop-shadow-xl text-red-700 "><i class="fa-solid fa-trash-can"></i></button>
            </div>
                                `
            
            totalCost += cart.cost

        })

        if(cart_details.length>0){
            table += `
        <div class="text-4xl mt-4 w-[100%] border-t-2 border-black font-bold pt-4 ">
        <div class="grid lg:grid-cols-7 gap-x-1 gap-y-1 align-baseline">

            <div class="col-span-4 place-self-start">
                Total Cost
            </div>
            <div class="col-span-2 text-orange-400 place-self-center ml-auto px-9">
                ₹${totalCost}
            </div>

            <a href="/confirm" class="col-span-1 place-self-center">
                <button id="checkout_btn" type="submit" class="hover:scale-105 ease-in-out duration-500 inline-block py-[11px] px-[28px] bg-green-500 text-2xl font-semibold rounded-[21px] shadow-xl">Checkout</button>
            </a>
        </div>
        </div>
                            `    
        }
        else{
            table += `
        <div class="text-4xl mt-4 w-[100%] font-bold pt-4 ">
        <div class="grid lg:grid-cols-7 gap-x-1 gap-y-1 align-baseline">

            <div class="col-span-7 place-self-center mt-5 text-orange-600">
                Your cart is empty!
            </div>
            

        </div>
        </div>
                            `   
        }
        
    
        
        

        document.getElementById("cart_cards").innerHTML = table

        
    });
}

get_cart_cards()