const stripe = require('stripe')(process.env.STRIPE_SECRET);
const path = require("path");


class Checkout{

    async createPaymentObject(req,res){
      console.log(req)

        const session = await stripe.checkout.sessions.create({
            line_items: [
              {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price: '{{PRICE_ID}}',
                quantity: 1,
              },
            ],
            mode: 'payment',
            success_url: `${YOUR_DOMAIN}/success.html`,
            cancel_url: `${YOUR_DOMAIN}/cancel.html`,
          });
        
          res.redirect(303, session.url);
        }
        

}



module.exports=new Checkout();


