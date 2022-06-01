const mongoose = require('mongoose');

const diveBarSchema = new mongoose.Schema({
    content: {
    type: String,
    required: true
    },
    date: {
    type: Date,
    default: Date.now
    }
})

module.exports = mongoose.model('DiveItem', diveBarSchema);