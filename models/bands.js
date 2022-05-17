const Band = require('../models/band.js');


class Bands {
    constructor(){
        this.bands = [];
    }

    addBand( band = new Band() ){
        this.bands.push( band );
    }

    getBands(){
        console.log(this.bands);
        return this.bands;
    }

    deleteBand( id = '' ){
        this.bands = this.bands.filter( band => band.id !== id);
        return this.bands;
    }

    voteBand( id = '' ){
        this.bands = this.bands.map( band => {
            if( band.id === id ){
                console.log(band.name);
                band.votes++;
                console.log(band.votes);
                return band;
            }else{
                return band;
            }
        } )
        console.log(this.bands);
    }

}

module.exports = Bands;