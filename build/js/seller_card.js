async function get_product_vendors(){
    let product_id = window.location.href.split("/") 
    fetch('/product_page_retail_mandi/'+product_id[product_id.length-1]).then(async (res) =>{
        var resp = await res.json()
        product_details = resp["product_details"]
        price_points = resp["price_point"]
        // console.log(resp)

        table = ""
        
        price_points.forEach((point)=>{
            table += `
            <form method="POST" action="#">
                <div class="bg-green-200 grid lg:grid-cols-12 gap-x-8 gap-y-4 items-center font-semibold text-xl rounded-lg p-2 drop-shadow-md justify-items-center mt-2">
                    <div class="col-span-4 justify-self-start text-black pl-1">
                        ${point.fname} ${point.lname}
                    </div>
                
                    <div class="col-span-2 text-center text-green-600">
                        ${point.shopno}
                    </div>
                
                    <div class="col-span-2 text-center  text-orange-500">
                        ${point.user_rate}
                    </div>
                
                    <div class="col-span-2 text-center w-[85%]">
                        
                        <input type="number" id="numberInput" min=1 class="border-0 text-center w-[100%] bg-green-100 rounded-[21px] inline-block text-lg font-semibold drop-shadow-xl" name="number" placeholder = >
                    </div>
                
                    <div class="col-span-2 text-center ">
                
                            <input type="hidden" id="s_name" name="s_name" value='${point.fname} ${point.lname}'>
                            <input type="hidden" id="s_shop" name="s_shop" value="${point.shopno}">
                            <input type="hidden" id="s_rate" name="s_rate" value="${point.user_rate}">
                            <input type="hidden" id="seller_id" name="seller_id" value="${point.user_id}">
                            <input type="hidden" id="prod" name="prod" value="${product_details[0].p_id}">

                                <button type="submit" class="w-[100%] bg-green-500 rounded-[21px] hover:scale-110 ease-in-out duration-500 inline-block py-[9px] px-[20px] text-lg font-semibold drop-shadow-xl text-black">Add</button>
                                
                    </div>
                                
                </div>
            </form>
                                `
            
        })

        document.getElementById("seller_card").innerHTML = table

        
    });
}

get_product_vendors()