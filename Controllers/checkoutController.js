const stripe = require('stripe')(process.env.STRIPE_SECRET);
const path = require("path");


class Checkout{
    async createPaymentObject(req,res){
      

        try {
            const { amount, currency, description, source } = req.body;
    
            const charge = await stripe.charges.create({
                amount,
                currency,
                description,
                source
            });
    
            res.status(200).json({ message: 'Payment processed successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    

}


}
module.exports=new Checkout();


