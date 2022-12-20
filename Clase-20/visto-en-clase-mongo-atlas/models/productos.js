import { Schema, model } from 'mongoose';

const productosSchema = new Schema({
	nombre: { type: String, require: true },
	precio: { type: Number, require: true },
	categoria: { type: String, require: true },
});

export const Productos = model('productos', productosSchema);
