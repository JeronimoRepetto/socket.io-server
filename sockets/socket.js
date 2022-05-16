const { io } = require('../index.js');

// Mensajes de Socket
io.on('connection', client => {
    console.log('Cliente conectado');
    client.on('disconnect', () => { 
        console.log('Cliente desconectado');
    });

    client.on('mensaje',( payload )=> {
        console.log("Mensaje!!", payload );

        io.emit( 'mensaje' , { admin: 'Nuevo mensaje'});
    });

    client.on('emitir-mensaje', ( payload ) =>{
        //console.log(payload);
        //io.emit('nuevo-mensaje', payload); // Emite a todos!
        client.brodcast.emit('nuevo-mensaje', payload);//emite a todos menos al que lo emitio
    });
  });