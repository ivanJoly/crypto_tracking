import mongoose from 'mongoose'

const MovementSchema = new mongoose.Schema({
  coin:{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Coin',
  },
  amount: {
    type: Number,
    required: [true, 'AMOUNT'],
  },
  price: {
    type: Number,
    required: [true, 'PRICE'],
  },
  total:{
    type: Number,
    required: [true, 'TOTAL'],
  }
})

export default mongoose.models.Movement || mongoose.model('Movement', MovementSchema)
