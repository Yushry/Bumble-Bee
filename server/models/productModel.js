import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  inventory: {
    type: Number,
    required: true
  }
});

export default model('Product', productSchema);