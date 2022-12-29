// Reformar el ejercicio anterior utilizado Faker para generar los objetos con datos aleatorios en español.
// A la ruta '/test' se le podrá pasar por query params la cantidad de objetos a generar.
// Ej: '/test?cant=30'.
// De no pasarle ningún valor, producirá 10 objetos.
// Incorporarle id a cada uno de los objetos generados en forma incremental, empezando por 1.
import express from "express";
import  faker  from "faker"
const app = express();
faker.locale = 'es'

app.use(express.json());
app.use(express.urlencoded({extended:true}))

const data = (cant) => {
    const { name, internet} = faker
    const arrayAuxiliar = [];
    
    const cantidad = cant || 10;
for(let i = 0; i < cantidad; i++) {
    const objeto = {
            id: i + 1 ,
            nombre: name.firstName(),
            apellido: name.lastName(),
            email: internet.email(),
        
        }
        arrayAuxiliar.push(objeto);
    }
    return arrayAuxiliar;
}


app.get('/test', (req, res) => { 
    const cant = req.query.cant;
    res.json(data(cant));
})


const PORT = 8080;
app.listen(PORT, () => { console.log(`todo bien el http://localhost:${PORT}`) });