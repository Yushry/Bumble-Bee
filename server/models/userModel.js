import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  loanBalance: {
    type: Number,
    default: 0
  },
  usedAmount: {
    type: Number,
    default: 0
  },
  installmentPlan: {
    type: String,
    enum: ['Plan a', 'Plan b', 'Plan c'],
    default: 'Plan a'
  },
  purchasedProducts: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
});

export default model('User', userSchema);