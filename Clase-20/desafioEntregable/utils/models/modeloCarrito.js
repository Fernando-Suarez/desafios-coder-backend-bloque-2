import { Schema, model } from 'mongoose';

const carritoSchema = new Schema({
    timestamp:{type: String , required: true},
    productos:{type: Array, required:true}
})

const Carrito = model('carritos', carritoSchema);

export default Carrito;