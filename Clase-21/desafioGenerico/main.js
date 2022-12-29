// Desarrollar un servidor basado en Node.js y express que para la ruta '/test' responda con un array de 10 objetos, con el siguiente formato:
// [{
//     nombre: '',
//     apellido: '',
//     color: ''
// }, …, …, …]

// Los objetos generados tendrán un valor aleatorio para cada uno de sus campos. El valor será obtenido de los siguientes arrays:
// const nombres = ['Luis', 'Lucía', 'Juan', 'Augusto', 'Ana']
// const apellidos = ['Pieres', 'Cacurri', 'Bezzola', 'Alberca', 'Mei']
// const colores = ['rojo', 'verde', 'azul', 'amarillo', 'magenta']

// Con cada request se obtendrán valores diferentes.

import express from 'express';
const app = express();

//midllewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//
const nombres = ['Luis', 'Lucía', 'Juan', 'Augusto', 'Ana']
const apellidos = ['Pieres', 'Cacurri', 'Bezzola', 'Alberca', 'Mei']
const colores = ['rojo', 'verde', 'azul', 'amarillo', 'magenta']
//
const random = (nombre, apellido, color) => {
    let arrayRandom = []
    for (let i = 0; i < 10; i++){
        const objRandom = {
            nombre: nombre[Math.floor(Math.random() * 5)],
            apellido: apellido[Math.floor(Math.random() * 5)],
            color: color[Math.floor(Math.random() * 5)]

        }
        arrayRandom.push(objRandom);
        
    }
    return arrayRandom;
};
random(nombres, apellidos, colores);
//
app.get('/test', (req, res) => {
    
        res.json(random(nombres, apellidos, colores))
    
})


//servidor
const PORT = process.env.PORT || 8080;
app.listen(8080, () => console.log(`Servidor escuchado en el puerto http://localhost:${PORT}`))