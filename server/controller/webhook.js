import Stripe from "stripe";
import Transaction from "../model/transaction.js";
import User from "../model/User.js";
console.log("webhook file loaded")
export const stripe = async (req,res)=>{    
    const stripe = new Stripe(process.env.STRIP_SECRET_KEY)
    const sig = req.headers['stripe-signature'];
    let event;
    console.log("1")

    try {
        event = stripe.webhooks.constructEvent(req.body,sig,process.env.STRIPE_WEBHOOK_SECRET);
        
    } catch (error) {
        return res.status(400).send(`Webhook Error: ${error.message}`)
    }
    console.log("2")
    try {
        console.log("3")
        switch(event.type){
            case "payment_intent.succeeded":{
                const paymentIntent = event.data.object;
                const sessionList = await stripe.checkout.sessions.list({
                    payment_intent:paymentIntent.id,

                })
                console.log("4")
                const session = sessionList.data[0];
                const  {transactionId,appId} = session.metadata;
                if(appId === 'chatgpt'){
                    const transaction = await Transaction.findOne({_id:transactionId,isPaid:false})
                    console.log("5")
                    // Update credits is user accout
                    
                    await User.updateOne({_id:transaction.userId},{$inc :{credits:transaction.credits}})
                    // update credit payment status

                    transaction.isPaid = true;

                    await transaction.save();


                }else{
                    return res.json({success:true,message:"ignored event:Invalid app"})
                }
                break;
            }
            default:
                console.log("unhandled event type",event.type)
                break;
            
        }
        res.json({recived:true})
    } catch (error) {
        console.error("webhook processing error:",error);
        res.status(500).send("internal server error")
    }
}