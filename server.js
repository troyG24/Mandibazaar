const mysql = require("mysql2");
const express = require("express");
const app = express()
const bodyParser = require("body-parser");
const fs = require('fs')
var router = express.Router()
app.use("/assets",express.static("assets"));
app.use(express.static('public'));


var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
localStorage.setItem('myFirstKey', 'myFirstValue');
// console.log(localStorage.getItem("user_id"));

app.use(bodyParser.urlencoded({
    extended:false
}));

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database : "nodejs"
});

connection.connect(function(error){
    if(error){
        console.log(error.message)
    }
    else console.log("Connected to the database");
});

//connecting the Frontend Js files
app.get("/date",function(req,res){
    res.sendFile(__dirname+"/build/js/date.js");
});
app.get("/add",function(req,res){
    res.sendFile(__dirname+"/build/js/add.js");
});
app.get("/log",function(req,res){
    res.sendFile(__dirname+"/build/js/log.js");
});
app.get("/retail",function(req,res){
    res.sendFile(__dirname+"/build/js/retail.js");
});
app.get("/script",function(req,res){
    res.sendFile(__dirname+"/build/js/script.js");
});
app.get("/popup",function(req,res){
    res.sendFile(__dirname+"/build/js/popup.js");
});
app.get("/reg",function(req,res){
    res.sendFile(__dirname+"/build/js/reg.js");
});
app.get("/seller_card",function(req,res){
    res.sendFile(__dirname+"/build/js/seller_card.js");
});
app.get("/cart_cards",function(req,res){
    res.sendFile(__dirname+"/build/js/cart_cards.js");
});

app.get("/signup_js",function(req,res){
    res.sendFile(__dirname+"/build/js/signup.js");
});

const jsonParser = bodyParser.json();
app.get("/delete_confirm" ,function(req,res){
    res.sendFile(__dirname+"/build/js/del_confirm.js");
});

app.get("/wholesale_delete_confirm" ,function(req,res){
    res.sendFile(__dirname+"/build/js/wholesaler_del_confirm.js");
});
//for logout
app.get("/logout",function(req,res){
    localStorage.clear()
    res.redirect("/login")
});

//landing_page
app.get("/", function (req, res) {
    let output = fs.readFileSync(__dirname + "/build/index.html", 'utf-8');
    const loginSignup = `<a href="/login" id="login-btn" class="mr-[42px] text-[24px] font-semibold">Login</a>
                         <a href="/signup" id="signup-btn" class="mr-[42px] text-[24px] font-semibold">Signup</a>`;

    const logout = `<a href="/logout" class="mr-[42px] text-[24px] font-semibold">Logout</a>`;

    const both_button = '<a href="/"><button id="btn1" type="submit" class="hover:scale-105 ease-in-out duration-500 inline-block h-[60px] w-[212px] py-[11px] px-[28px] bg-green-500 text-2xl font-semibold rounded-[21px] mr-[50px] drop-shadow-xl">Start buying</button></a> <a href="/"><button type="submit" id="btn2" class="hover:scale-105 ease-in-out duration-500 inline-block h-[60px] w-[212px] py-[11px] px-[28px] bg-orange-400 text-2xl font-semibold rounded-[21px] drop-shadow-xl">Start selling</button></a>';

    const retail_button = `<a href="/retailhome"><button type="submit" class="hover:scale-105 ease-in-out duration-500 inline-block h-[60px] w-[212px] py-[11px] px-[28px] bg-green-500 text-2xl font-semibold rounded-[21px] mr-[40px] drop-shadow-xl">Start buying</button></a>
                           <a href="/retail_order"><button type="submit" class="hover:scale-105 ease-in-out duration-500 inline-block h-[60px] w-[212px] py-[11px] px-[28px] bg-green-500 text-2xl font-semibold rounded-[21px] mr-[50px] drop-shadow-xl">Your Orders</button></a>`;

    const wholesale_button = `<a href="/wholesalehome"><button type="submit" class="mr-[40px] hover:scale-105 ease-in-out duration-500 inline-block h-[60px] w-[212px] py-[11px] px-[28px] bg-orange-400 text-2xl font-semibold rounded-[21px] drop-shadow-xl">Start selling</button></a>
                              <a href="/wholesale_order"><button type="submit" class="hover:scale-105 ease-in-out duration-500 inline-block h-[60px] py-[11px] px-[28px] bg-orange-400 text-2xl font-semibold rounded-[21px] drop-shadow-xl">Manage Orders</button></a>   `;

    if (localStorage.getItem("user_id")) {
        output = output.replace('{{%LOGIN_SIGNUP%}}', logout);

        connection.query("select * from mandi.user where user_id = ?", [localStorage.getItem("user_id")], function (err, result, fields) {

            // console.log(result);
            // console.log(result[0].is_buyer);

            if (result[0].is_buyer == 1)
                output = output.replace('{{%BUTTON%}}', retail_button);

            else
                output = output.replace('{{%BUTTON%}}', wholesale_button);

            // Sending the response after the replacement is done
            res.end(output);
        });
    } else {
        output = output.replace('{{%LOGIN_SIGNUP%}}', loginSignup);
        output = output.replace('{{%BUTTON%}}', both_button);

        // Sending the response
        res.end(output);
    }
});

app.get("/signup", function(req,res){
    if(localStorage.getItem("user_id")){
        res.redirect("/")
    } else {

        res.sendFile(__dirname+"/build/signup.html");
    }
});

app.post("/signup",function(req,res){
    var phno = req.body.phno;
    var fname = req.body.fname;
    var mname = req.body.mname;
    var lname = req.body.lname;
    var email = req.body.email;
    var dob = req.body.dob;
    var gender = req.body.gender;
    var shopaddr = req.body.shopaddr;
    var shopno =  req.body.shopno;
    var pin = req.body.pin;
    var user_type = req.body.user_type;
    var gstin = req.body.gstin;
    var pan = req.body.pan;
    var password  = req.body.password;


    try{
        connection.query("INSERT INTO mandi.user (phno ,fname, mname, lname, gender, dob, user_password, shopaddress, shopno, pincode, gstin, pan, email, is_buyer) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[phno,fname,mname,lname,gender,dob,password,shopaddr,shopno,pin,gstin,pan,email,user_type],function(err,result,fields){console.log(err)});
    }
    catch(err){
    }

    res.redirect("/success");
});

function isValidSession(dateTime) {
    const currentDateTime = new Date();
    const timeDifference = currentDateTime - dateTime;
    const hoursDifference = timeDifference / (1000 * 60 * 60);

    if (hoursDifference <= 3) {
        return true;
    } else {
        return false;
    }
}
app.get("/login",function(req,res){
    var dtm = localStorage.getItem("login_dtm")
    console.log(dtm)
    console.log(isValidSession(dtm))
    
    if(dtm && !isValidSession(dtm)){
        res.redirect("/")
    }
    res.sendFile(__dirname+"/build/login.html");
});

app.get("/inv_login",function(req,res){
    res.sendFile(__dirname+"/build/inv_login.html");
});


app.post("/login", function(req,res){
    var phone = req.body.phone;
    var pass = req.body.passw;
    // console.log(req.body,phone, pass)

    connection.query("select * from mandi.user where phno= ? and user_password = ?",[phone,pass] ,function(err,result, fields){
        // console.log(err, result);

        if(result.length > 0){
            localStorage.setItem('user_id',result[0].user_id);
            localStorage.setItem('login_dtm',new Date());
            if(result[0].is_buyer == 1){
                res.redirect("/retailhome");
            }
            else{
                res.redirect("/wholesalehome");
            }
        } 
        
        else {
            res.redirect("/inv_login");
        }
        res.end();
    });

});

//RETAILER-------------------------------------------------------------------------------------------------------------------------------------------------------------------
app.get("/retailhome",function(req,res){
    let output = fs.readFileSync(__dirname + "/build/retail_home.html", 'utf-8');

    connection.query("SELECT DISTINCT mandi.product.* FROM mandi.product JOIN mandi.manages ON mandi.product.p_id = manages.p_id",function(err,result,fields){
        console.log(err)
        console.log(result)

        let productCards = '';

        if (result.length !== 0) {
            // Iterate over each product and generate HTML for the card
            result.forEach(product =>{
              let card = fs.readFileSync(__dirname + "/build/card_template.html", 'utf-8');
              card = card.replace('{{%IMAGE_PATH%}}', product.p_image_small);
              card = card.replace('{{%PRODUCT_NAME%}}', product.p_name);
              card = card.replace('{{%product_id%}}', product.p_id);
      
      
                  productCards += card;
            });
      
            output = output.replace('{{%PRODUCT_CARDS%}}', productCards);
          }
      
          else
          console.log("no products found");
      
          res.send(output);
      
    });

    
});    

app.get("/product_page_retail/:product_id",async function(req,res){

    var product_id = req.params.product_id

    Promise.all([
        new Promise((resolve, reject) => {
            connection.query('SELECT * FROM mandi.product WHERE p_id = ?',[product_id], (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        }),
    ]).then(([productDetails]) => {
        let output = fs.readFileSync(__dirname + "/build/product_page_retail.html", 'utf-8');
        let sellerCards = '';

        if (productDetails && productDetails.length > 0) {
            let prod_info = productDetails[0];
        
            output = output.replace('{{%P_NAME%}}', prod_info.p_name);
            output = output.replace('{{%P_CAT%}}', prod_info.category);
            output = output.replace('{{%P_IMG%}}', prod_info.p_image_large);
        
            res.send(output);
        } else {
            res.send(output);
        }
       

        // res.json({ productDetails, pricePoints });
    }).catch(error => {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data from database');
    });


});

app.get("/product_page_retail_mandi/:product_id", async function(req,res){
    var product_id = req.params.product_id

    Promise.all([
        new Promise((resolve, reject) => {
            connection.query('SELECT * FROM mandi.product WHERE p_id = ?',[product_id], (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        }),
        new Promise((resolve, reject) => {
            connection.query('SELECT * FROM mandi.manages manages join mandi.user u on u.user_id = manages.w_id WHERE manages.p_id = ?',[product_id], (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        })
    ]).then(([productDetails,pricePoints])=>{
        res.send({"product_details":productDetails, "price_point":pricePoints})
    })
    
})

app.post("/product_page_retail/:product_id",async function(req,res){
    console.log(req.body)
    var number = req.body.number;
    const s_name = req.body.s_name;
    const s_shop = req.body.s_shop;
    var s_rate = req.body.s_rate;
    const p_id = req.body.prod;
    const w_id = req.body.seller_id;
    
    number = Number(number);
    s_rate = s_rate.slice(0,-3);
    s_rate = Number(s_rate);

   
    query23 = 'select * from mandi.cart where p_id = ? and w_id = ? and retailer_id = ?'
    query24 = 'insert into mandi.cart (p_id,w_id,retailer_id,quantity,cost) values (?,?,?,?,?)'
    query25 = 'update mandi.cart set quantity = ?, cost =? where p_id = ? and w_id = ? and retailer_id = ?'
    
    connection.query(query23,[p_id,w_id,localStorage.getItem("user_id")], (error, resu, fields) => {
        
        if(resu == 0){//new addititon to cart
            connection.query(query24,[p_id,w_id,localStorage.getItem("user_id"),number,(number*s_rate)], (error, results, fields) => {
                console.log("Entry done to cart");
             });
        }
        else{//already in cart product so update quantity only
            connection.query(query25,[(resu[0].quantity+number),((resu[0].quantity+number)*s_rate),p_id,w_id,localStorage.getItem("user_id")], (error, results, fields) => {
                console.log(error)
                console.log("cart quantity updated");
             });
        }


    });


    connection.query(query24,[p_id,w_id,localStorage.getItem("user_id"),number,(number*s_rate)], (error, results, fields) => {
       console.log("Entry done to cart");
    });

});


app.get("/cart_cards_mandi",async function(req,res){
    Promise.all([
        new Promise((resolve, reject) => {
            connection.query('SELECT * FROM mandi.cart cart join mandi.manages manages on cart.w_id = manages.w_id and cart.p_id = manages.p_id join mandi.product product on cart.p_id = product.p_id join mandi.user u on cart.w_id = u.user_id where cart.retailer_id = ? order by product.p_name ASC',[localStorage.getItem("user_id")], (error, results, fields) => {
                // console.log(results)
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }

            });
        })
    ]).then(([cart_details])=>{
        res.send({"cart_details":cart_details})
    })

    
    

});

app.get("/cart",function(req,res){
    res.sendFile(__dirname+"/build/cart.html");
})

app.post("/delete_confirm",jsonParser,function(req,res){
    console.log(req.body)
    var p_id = req.body.product_id
    var w_id = req.body.whole_seller_id
    // console.log(`delete FROM mandi.cart where w_id = ${w_id} and p_id = ${p_id};`)

    connection.query('delete FROM mandi.cart where w_id = ? and p_id = ?',[w_id,p_id], (err, results, fields) => {
        if(err){
            res.send({success:false})
        }
        res.send({success:true})
    });
});

app.get("/confirm",function(req,res){

    function generateRandomNumber() {
        return Math.floor(10000 + Math.random() * 90000);
    }
    
    // Function to check if the generated number is unique
    function isUnique(number, usedNumbers) {
        return !usedNumbers.has(number);
    }
    
    // Function to generate a unique 5-digit order ID
    function generateUniqueOrderId(usedNumbers) {
        let number;
        do {
            number = generateRandomNumber();
        } while (!isUnique(number, usedNumbers));
    
        usedNumbers.add(number);
        return number;
    }
    // Usage example
    let usedNumbers = new Set();
    let orderId = generateUniqueOrderId(usedNumbers);
    // console.log("Generated Order ID:", orderId);

    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${day}-${month}-${year}`;
    // console.log(currentDate); // "17-6-2022"
    
    var totalOrderCost = 0;

    connection.query('select * from mandi.cart where retailer_id = ?',[localStorage.getItem("user_id")],(error,results,fields) =>{
        console.log(results);
        if(results!=0){

            for(var i=0 ; i<results.length ; i++){
                totalOrderCost += results[i].cost;
                connection.query('insert into mandi.order_det (o_id,p_id,quant,cost,w_id,retailer_id,order_status) values (?,?,?,?,?,?,?)',[orderId,results[i].p_id,results[i].quantity,results[i].cost,results[i].w_id,results[i].retailer_id,'Pending'], (error, resu, fields) => {
                    console.log(error)
                });
            }
            console.log('checkout entry done into table order_det');

            connection.query('insert into mandi.orders (o_id, order_date, total_cost, retailer_id) values (?,?,?,?)',[orderId, currentDate, totalOrderCost , localStorage.getItem("user_id")],(err,res,fields) =>{
                console.log(err);
            });
            
            connection.query('DELETE FROM mandi.cart where retailer_id = ?',[localStorage.getItem("user_id")],(error,results,fields) =>{
                // console.log(error)
                console.log('cart has been updated');
            });
            
        }
        else{
            console.log("cart is empty")

        }
    });

    let page = fs.readFileSync(__dirname + "/build/confirm.html", 'utf-8');
    page = page.replace('{{%ORDER_ID%}}',orderId);

    res.send(page);
});

app.get("/retail_profile",function(req,res){
    let page = fs.readFileSync(__dirname + "/build/retail_profile.html", 'utf-8')

    connection.query("select * from mandi.user where user_id = ? ",[localStorage.getItem("user_id")] ,function(err,results, fields){
        console.log(err);

        const dateTimeString  = results[0].dob.toString();
        const datePart = dateTimeString.slice(4, 15);

        let name = (results[0].fname + ' ' + results[0].mname + ' ' + results[0].lname);
        if(results.length > 0){
                page = page.replace('{{%NAME%}}', name);
                page = page.replace('{{%PHNO%}}', results[0].phno);
                page = page.replace('{{%GSTIN%}}', results[0].gstin);
                page = page.replace('{{%PAN%}}', results[0].pan);
                page = page.replace('{{%DOB%}}', datePart);
                page = page.replace('{{%EMAIL%}}', results[0].email);
                page = page.replace('{{%SHOPADD%}}', results[0].shopaddress);
        }else{
                console.log("No data found");
        }
            res.send(page)    
    });

    

});

app.get("/retail_order",function(req,res){
    
    let fullPage = fs.readFileSync(__dirname + "/build/retail_order.html", 'utf-8');
    let card = fs.readFileSync(__dirname + "/build/retail_order_card.html", 'utf-8')
    let allCards = ''

    connection.query('select * from mandi.orders where retailer_id = ? order by order_date DESC',[localStorage.getItem("user_id")],(error,results,fields) =>{
        // console.log(error)
        // console.log(results)
        
        if (results.length !== 0) {
            
            for(let i=0 ; i<results.length ; i++){
                card = card.replace('{{%ORDER_ID%}}', results[i].o_id);
                card = card.replace('{{%ORDER_DATE%}}', results[i].order_date);
                card = card.replace('{{%TOTAL_COST%}}', results[i].total_cost);
                card = card.replace('{{%order_id%}}', results[i].o_id);
                

                allCards += card;
                card = fs.readFileSync(__dirname + "/build/retail_order_card.html", 'utf-8')
            }
            
            fullPage = fullPage.replace('{{%ALL_CARDS%}}',allCards);
        }
      
        else{
            allCards= `<div class="text-4xl mt-4 w-[100%] font-bold pt-4 ">
            <div class="grid lg:grid-cols-7 gap-x-1 gap-y-1 align-baseline">
    
                <div class="col-span-7 place-self-center mt-5 text-orange-600">
                   No Orders Placed Yet!
                </div>
                
    
            </div>
            </div>`
            // console.log("NO ORDERS FOUND");
            fullPage = fullPage.replace('{{%ALL_CARDS%}}',allCards);
        }

          res.send(fullPage);
    });


});


app.get("/retail_order_details/:o_id",async function(req,res){

    var order_id = req.params.o_id

    Promise.all([
        new Promise((resolve, reject) => {
            connection.query('SELECT * FROM mandi.orders orders join mandi.order_det on orders.o_id = order_det.o_id join mandi.product product on order_det.p_id = product.p_id join mandi.user u on u.user_id = order_det.w_id join mandi.manages manages on manages.w_id = order_det.w_id and manages.p_id = order_det.p_id WHERE orders.o_id = ?',[order_id], (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        }),
    ]).then(([orderDetails]) => {
        let output = fs.readFileSync(__dirname + "/build/retail_order_details.html", 'utf-8');
        let all_row = ' ';
        let end = fs.readFileSync(__dirname + "/build/end_total_line.html", 'utf-8');
        let total_charge = 0;
        // console.log(orderDetails)
        if (orderDetails && orderDetails.length > 0) {
            
             output = output.replace('{{%ORDER_ID%}}',orderDetails[0].o_id)
             output = output.replace('{{%ORDER_DATE%}}',orderDetails[0].order_date)
            
             for(let i=0 ; i<orderDetails.length ; i++){
                let row = fs.readFileSync(__dirname + "/build/retail_order_details_card.html", 'utf-8');
                row = row.replace('{{%p_name%}}',orderDetails[i].p_name)
                row = row.replace('{{%name%}}',orderDetails[i].fname +' '+ orderDetails[i].lname)
                row = row.replace('{{%rate%}}',orderDetails[i].user_rate)
                row = row.replace('{{%quantity%}}',orderDetails[i].quant)
                row = row.replace('{{%cost%}}',orderDetails[i].cost)
                row = row.replace('{{%status%}}',orderDetails[i].order_status)
                
                total_charge += orderDetails[i].cost;
                all_row += row;
             }
            //  console.log(total_charge)
             if(total_charge>0){
                end = end.replace('{{%total_cost%}}',total_charge);
                output = output.replace('{{%CARDS%}}',all_row)
                output = output.replace('{{%end_line%}}',end)
             }
             res.send(output);
             
        } else {
            res.send(output);
        }
       
    }).catch(error => {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data from database');
    });


});


//WHOLESALER-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

app.get("/wholesalehome",function(req,res){
    res.sendFile(__dirname+"/build/wholesale_home.html");
});

//Order Managing pages
app.get("/wholesale_order",function(req,res){
   
    let fullPage = fs.readFileSync(__dirname + "/build/wholesale_order.html", 'utf-8');
    let allCards = ''

    connection.query('select * from mandi.order_det order_det join mandi.orders orders on order_det.o_id = orders.o_id where w_id = ? group by orders.o_id order by orders.order_date DESC',[localStorage.getItem("user_id")],(error,results,fields) =>{
        // console.log(error)
        // console.log(results)
        
        if (results.length !== 0) { 
            for(let i=0 ; i<results.length ; i++){
                card = fs.readFileSync(__dirname + "/build/wholesale_order_card.html", 'utf-8')
                card = card.replace('{{%ORDER_ID%}}', results[i].o_id);
                card = card.replace('{{%ORDER_STATUS%}}', results[i].order_status);
                card = card.replace('{{%ORDER_DATE%}}', results[i].order_date);
                card = card.replace('{{%TOTAL_COST%}}', results[i].cost);
                card = card.replace('{{%order_id%}}', results[i].o_id);

                allCards += card;
            }
            
            fullPage = fullPage.replace('{{%ALL_CARDS%}}',allCards);
        }
      
          else{
              allCards= `<div class="text-4xl mt-4 w-[100%] font-bold pt-4 ">
              <div class="grid lg:grid-cols-7 gap-x-1 gap-y-1 align-baseline">
      
                  <div class="col-span-7 place-self-center mt-5 text-orange-600">
                     No Orders Recieved Yet!
                  </div>
                  
      
              </div>
              </div>`
            //   console.log("NO ORDERS FOUND");
              fullPage = fullPage.replace('{{%ALL_CARDS%}}',allCards);
          }

      
          res.send(fullPage);
    });

});

app.get("/wholesale_order_details/:order_id",async function(req,res){

    var order_id = req.params.order_id

    Promise.all([
        new Promise((resolve, reject) => {
            connection.query('SELECT * FROM mandi.orders orders join mandi.order_det on orders.o_id = order_det.o_id join mandi.product product on order_det.p_id = product.p_id join mandi.user u on u.user_id = order_det.retailer_id join mandi.manages manages on manages.w_id = order_det.w_id and manages.p_id = order_det.p_id  WHERE orders.o_id = ? and order_det.w_id = ? and u.is_buyer = 1',[order_id,localStorage.getItem("user_id")], (error, results, fields) => {
                // console.log(error)
                // console.log(results)
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        }),
    ]).then(([orderDetails]) => {
        let output = fs.readFileSync(__dirname + "/build/wholesale_order_details.html", 'utf-8');
        let all_row = ' ';
        let total_charge = 0;
        // console.log(orderDetails)
        if (orderDetails && orderDetails.length > 0) {
            
             output = output.replace('{{%ORDER_ID%}}',orderDetails[0].o_id)
             output = output.replace('{{%ORDER_DATE%}}',orderDetails[0].order_date)
             output = output.replace('{{%RETAILER_NAME%}}',orderDetails[0].fname+' '+orderDetails[0].lname)

            
             for(let i=0 ; i<orderDetails.length ; i++){
                let row = fs.readFileSync(__dirname + "/build/wholesale_order_details_card.html", 'utf-8');
                row = row.replace('{{%p_name%}}',orderDetails[i].p_name)
                row = row.replace('{{%rate%}}',orderDetails[i].user_rate)
                row = row.replace('{{%quantity%}}',orderDetails[i].quant)
                row = row.replace('{{%cost%}}',orderDetails[i].cost)
                row = row.replace('{{%status%}}',orderDetails[i].order_status)
                
                total_charge += orderDetails[i].cost;
                all_row += row;
             }
            //  console.log(total_charge)
             if(total_charge>0){
                output = output.replace('{{%CARDS%}}',all_row)
                output = output.replace('{{%total_cost%}}',total_charge);
                
                if(orderDetails[0].order_status == "Pending"){            
                    output = output.replace('{{%ready_button%}}',`<a href="/wholesale_confirm/${orderDetails[0].o_id}" class=" place-self-end block">
                                                                        <button type="submit" class="hover:scale-105 ease-in-out duration-500 inline-block mr-1 py-[11px] px-[28px] bg-green-500 text-2xl font-semibold rounded-[24px] shadow-xl h-[50%]">Mark Ready</button>
                                                                   </a>`)
                }
                else{//Not Ready Button
                    output = output.replace('{{%ready_button%}}',` <a href="/wholesale_not_ready/${orderDetails[0].o_id}" class=" place-self-end block">
                                                                        <button type="submit" class="hover:scale-105 ease-in-out duration-500 inline-block mr-1 py-[11px] px-[28px] bg-orange-500 text-xl font-semibold rounded-[24px] shadow-xl h-[50%]">Mark Pending</button>
                                                                    </a>`)
                }
                
             }
             res.send(output);
             
        } else {
            res.send(output);
        }
       
    }).catch(error => {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data from database');
    });


});

app.get("/wholesale_confirm/:o_id",function(req,res){

    var o_id = req.params.o_id
    console.log(o_id)
    connection.query('update mandi.order_det order_det set order_status = "Ready" where order_det.o_id = ? and w_id = ?',[o_id,localStorage.getItem("user_id")], (error, results, fields) => {
        if(error == null){
            res.redirect("/wholesale_confirm");
        }
    });

});

app.get("/wholesale_not_ready/:o_id",function(req,res){

    var o_id = req.params.o_id
    console.log(o_id)

    connection.query('update mandi.order_det order_det set order_status = "Pending" where order_det.o_id = ? and w_id',[o_id,localStorage.getItem("user_id")], (error, results, fields) => {
        console.log(error,results)
        if(error == null){
            res.redirect("/wholesale_not_ready");
        }
    });

});

app.get("/wholesale_not_ready",function(req,res){
    res.sendFile(__dirname+"/build/wholesale_not_ready.html");
});

app.get("/wholesale_confirm",function(req,res){
    res.sendFile(__dirname+"/build/wholesale_confirm.html");
});


//Products managing pages
app.get("/wholesale_add_products",function(req,res){
    // res.sendFile(__dirname+"/build/wholesale_add_products.html")
    let fullPage = fs.readFileSync(__dirname + "/build/wholesale_add_products.html", 'utf-8');
    let all_options = ' '

    connection.query('select distinct p_name from mandi.product',(error,results,fields) =>{
        // console.log(error,results)
        if (results.length !== 0) {
            
            for(let i=0 ; i<results.length ; i++){
                let option = '<option value="{{%option_value%}}" class="p-2 text-center ">{{%option_name%}}</option>'
                option = option.replace('{{%option_value%}}', results[i].p_name);
                option = option.replace('{{%option_name%}}', results[i].p_name);

                all_options += option; 
            }
            
            fullPage = fullPage.replace('{{%options%}}',all_options);
        }
      
          else
          console.log("NO products found in database");
      
          res.send(fullPage);
    });




});


app.post("/wholesale_add_products",function(req,res){
    var product_name = req.body.product_name
    var user_rate = req.body.user_rate
    user_rate = user_rate + "/kg"
    var w_id = localStorage.getItem("user_id")   

    console.log(product_name,w_id,user_rate)
    if(product_name !=0 && user_rate !=0){
        connection.query('select * from mandi.manages manages join mandi.product product on manages.p_id = product.p_id where manages.w_id = ? and product.p_name = ?',[w_id,product_name],(error,results,fields) =>{
                //   console.log(results,error) 
                   if(results.length != 0){
                    connection.query('update mandi.manages set user_rate = ? where w_id = ? and p_id = ?',[user_rate,w_id,results[0].p_id],(err,resu,fields) =>{
                            //    console.log(resu,err) 
                               console.log("updation of rate done successfully")
                               res.redirect("/wholesale_update_success")
                            });
                   }
                   else{
                    connection.query('select * from mandi.product where p_name = ?',[product_name],(err1,res1,fields) =>{   
                        // console.log(res1,err1) 
                        connection.query('insert into mandi.manages (w_id,p_id,user_rate) values(?,?,?)',[w_id,res1[0].p_id,user_rate],(err,resu,fields) =>{
                            // console.log(resu,err) 
                            console.log("Product added to Manages table successfully")
                            res.redirect("/product_added_success")
                        });

                    });
                   }
        });
    }
    // if(product_id !=0 && user_rate !=0){
    //     connection.query('insert into mandi.manages (w_id,p_id,user_rate) values(?,?,?,?)',[w_id,product_id,user_rate],(error,results,fields) =>{
    //        console.log(results,error) 
    //     });
    
    // }

});
app.get("/product_added_success",function(req,res){

    res.sendFile(__dirname+"/build/wholesale_product_added_success.html")
});
app.get("/wholesale_update_success",function(req,res){
    res.sendFile(__dirname+"/build/wholesale_update_success.html");
});

app.get("/wholesale_your_products",function(req,res){
    let output = fs.readFileSync(__dirname + "/build/wholesale_your_products.html", 'utf-8');

    connection.query("SELECT * FROM mandi.manages manages join mandi.product product on manages.p_id = product.p_id where manages.w_id = ? ",[localStorage.getItem("user_id")],function(err,result,fields){
      

        let productCards = '';

        if (result.length !== 0) {
            // Iterate over each product and generate HTML for the card
            result.forEach(product =>{
              let card = fs.readFileSync(__dirname + "/build/wholesale_product_card_template.html", 'utf-8');
              card = card.replace('{{%IMAGE_PATH%}}', product.p_image_small);
              card = card.replace('{{%PRODUCT_NAME%}}', product.p_name);
              card = card.replace('{{%product_id%}}', product.p_id);
      
      
                  productCards += card;
            });
      
            output = output.replace('{{%PRODUCT_CARDS%}}', productCards);
          }
      
          else
          console.log("no products found");
      
          res.send(output);
      
    });});

app.get("/wholesale_product_page/:product_id",async function(req,res){
        var product_id = req.params.product_id
        Promise.all([
            new Promise((resolve, reject) => {
                connection.query('SELECT * FROM mandi.product product join mandi.manages manages on product.p_id = manages.p_id WHERE product.p_id = ? and manages.w_id = ?',[product_id,localStorage.getItem("user_id")], (error, results, fields) => {
                    console.log(error)
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
            }),
        ]).then(([productDetails]) => {
            let output = fs.readFileSync(__dirname + "/build/wholesale_product_page.html", 'utf-8');
            let sellerCards = '';
    
            if (productDetails && productDetails.length > 0) {
                let prod_info = productDetails[0];
            
                output = output.replace('{{%P_NAME%}}', prod_info.p_name);
                output = output.replace('{{%P_CAT%}}', prod_info.category);
                output = output.replace('{{%P_IMG%}}', prod_info.p_image_large);
                output = output.replace("{{%RATE%}}", prod_info.user_rate)
                res.send(output);
            } else {
                res.redirect("/wholesale_your_products")
            }
           
        }).catch(error => {
            console.error('Error fetching data:', error);
            res.status(500).send('Error fetching data from database');
        });
    
    
});

app.post("/wholesale_product_page/:product_id",async function(req,res){
    var product_id = req.params.product_id
    var del_confirmation = req.body.del_confirmation

    if(del_confirmation){
        connection.query('delete from mandi.manages where w_id = ? and p_id = ?',[localStorage.getItem("user_id"),product_id],(error,results,fields) =>{
            // console.log(results,error) 
            res.redirect("/wholesale_product_delete")
        });
    }
        
});

app.get("/wholesale_product_delete", function(req,res){
    res.sendFile(__dirname+"/build/wholesale_product_delete.html");
});

//profile page
app.get("/wholesale_profile",function(req,res){
    let page = fs.readFileSync(__dirname + "/build/wholesale_profile.html", 'utf-8')

    connection.query("select * from mandi.user where user_id = ? ",[localStorage.getItem("user_id")] ,function(err,results, fields){
        console.log(err);

        const dateTimeString  = results[0].dob.toString();
        const datePart = dateTimeString.slice(4, 15);

        let name = (results[0].fname + ' ' + results[0].mname + ' ' + results[0].lname);
        if(results.length > 0){
                page = page.replace('{{%NAME%}}', name);
                page = page.replace('{{%PHNO%}}', results[0].phno);
                page = page.replace('{{%GSTIN%}}', results[0].gstin);
                page = page.replace('{{%PAN%}}', results[0].pan);
                page = page.replace('{{%DOB%}}', datePart);
                page = page.replace('{{%EMAIL%}}', results[0].email);
                page = page.replace('{{%SHOPADD%}}', results[0].shopaddress);
        }else{
                console.log("No data found");
        }
            res.send(page)    
    });

    });


app.get("/success", function(req,res){
    res.sendFile(__dirname+"/build/success.html");
});







app.listen(5500);
module.exports = router