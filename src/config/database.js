import mongoose from 'mongoose';

class Database {
    constructor() {
        this.init();
    }

    init(){
        mongoose.connect('mongodb://localhost/potential',
            {useUnifiedTopology:true, useNewUrlParser: true},
            console.log('MongoDB connected')
        );
    }
}

export default new Database();