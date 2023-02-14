const { Schema, model } = require('mongoose');

const productosSchema = new Schema({
	nombre: { type: String, required: true, max: 200 },
	precio: { type: Number, required: true },
	categoria: { type: String, required: true },
	thumbnail: { type: String, required: true },
});

const modeloProductos = model('productos', productosSchema);

module.exports = modeloProductos;

// import { Schema, model } from 'mongoose';

// const productosSchema = new Schema({
// 	nombre: { type: String, require: true },
// 	precio: { type: Number, require: true },
// 	descripcion: {type: String,required:true},
// 	codigo:{type:String,required:true},
// 	foto:{type:String},
// 	stock:{type:Number,required:true},
// });

// const Productos = model('productos', productosSchema);

// export default Productos;
