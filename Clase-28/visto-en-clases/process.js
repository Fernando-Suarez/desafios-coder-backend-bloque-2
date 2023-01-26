//*process exit
// Provocará que el programa acabe, incluso en el caso que haya operaciones asíncronas que no se hayan completado o que se esté escuchando eventos diversos en el programa.
// process.exit()

//*process on
// Dicha función está escuchando durante todo el proceso que se ejecuta, es por eso que solo se puede actuar sobre su callback.
// Se define como se definen los eventos en Javascript. En el método on, indicando el tipo de evento que queremos escuchar y un callback que se ejecutará cuando ese evento se dispare.

// process.on('evento',callback)

//*evento beforeExit
// Normalmente, el proceso de Node se cerrará cuando no haya trabajo programado, pero un oyente registrado en el evento beforeExit puede realizar llamadas asincrónicas y, por lo tanto, hacer que el proceso de Node continúe.

process.on('beforeExit', () => {
	console.log('proceso terminado');
});

//* evento Exit
// El evento exit se emite cuando el proceso de Node está a punto de salir como resultado de que:
// El método process.exit( ) se llama explícitamente.
// El ciclo de eventos de Node ya no tiene ningún trabajo adicional que realizar.
// No hay forma de evitar la salida del bucle de eventos en este punto, y una vez que todos los oyentes de 'salida' hayan terminado de ejecutar, el proceso de Node terminará.

process.on('exit', () => {
	console.log('antes de terminar el proceso');
});

//*evento uncaughtException

// Se emite cuando una excepción es devuelta hacia el bucle de evento.
// Si se agregó un listener a esta excepción, no se producirá la acción por defecto (imprimir una traza del stack y salir).
// Es un mecanismo muy básico para manejar excepciones.

process.on('uncaughtException', (err) => {
	console.log('excepcion recogida' + err);
});

setTimeout(() => {
	console.log('esto seguira ejecutandose');
}, 500);

//se fuerza una excepcion pero no la recoge

nonexistenfunction();

console.log('esto no se ejecutara');
