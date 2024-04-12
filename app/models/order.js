const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    customerId :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    items :{type: Object, required: true},
    phone :{type: 'string', required: true},
    address :{type: 'Number', required: true},
    paymentType :{type: 'string', default: 'COD',},
    status :{type: 'string', default: 'order_placed',},
},{timmestapms:true});

module.exports = mongoose.model('Order' , orderSchema)