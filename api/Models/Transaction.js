const mongoose =require('mongoose')


const Transactionschema = mongoose.Schema({
    
    name:{type: String,required:true},
    description:{type: String,required:true},
    datetime:{type: Date ,required:true},
    price:{type:Number,required:true}
})


const Transactionmodel = mongoose.model('transaction',Transactionschema)

module.exports=Transactionmodel