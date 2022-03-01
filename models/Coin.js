import mongoose from 'mongoose'

const CoinSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for this crypto.'],
    maxlength: [20, 'Name cannot be more than 20 characters'],
  },
  symbol: {
    type: String,
    required: [true, "Please provide the pet token"],
    maxlength: [8, "SYMBOL"],
  },
  address: {
    type: String,
    required: [true, 'ADDRESS'],
  },
  icon_url: {
    type: String,
    required: [true, 'icon url'],
  },
})

export default mongoose.models.Coin || mongoose.model('Coin', CoinSchema)
