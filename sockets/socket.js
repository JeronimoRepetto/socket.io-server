const { io } = require('../index.js');
const Band = require('../models/band');
const Bands = require('../models/bands.js');
const bands = new Bands();

bands.addBand(new Band('Viejo Miseria'));
bands.addBand(new Band('Queen'));
bands.addBand(new Band('The Beatles'));
bands.addBand(new Band('Metalica'));


// Mensajes de Socket
io.on('connection', client => {
    console.log('Cliente conectado');

    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    // client.on('mensaje', (payload) => {
    //    console.log("Mensaje!!", payload);
    //    io.emit('mensaje', { admin: 'Nuevo mensaje' });
    //  });

    client.on('vote-band', (payload) => {
        console.log(payload);
        bands.voteBand(payload.id);
        io.emit('active-bands', (bands.getBands()));
    });

    client.on('add-band', (payload) => {
        console.log(payload);
        newBand = new Band(payload.name);
        bands.addBand(newBand);
        io.emit('active-bands', (bands.getBands()));
    });


    client.on('delete-band', (payload) => {
        console.log(payload);
        bands.deleteBand(payload.id);
        io.emit('active-bands', (bands.getBands()));
    });

    // client.on('emitir-mensaje', (payload) => {
    //console.log(payload);
    //io.emit('nuevo-mensaje', payload); // Emite a todos!
    //    client.brodcast.emit('nuevo-mensaje', payload);//emite a todos menos al que lo emitio
    // });
});