const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    release_date: {
        type: String
    },
    metacritic_score: {
        type: String
    },
    image_link:{
        type: String
    },
    description: {
        type: String
    },
    publisher: {
        type: String
    },
    platform: {
        type: String
    },
    tags: {
        type: String
    }
}, {collection: 'Games'})

const Game = mongoose.model('Game', gameSchema)
module.exports = Game