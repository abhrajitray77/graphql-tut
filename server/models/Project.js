const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Not Running', 'Running', 'Completed']
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId, //it's an objectid related to another model using ref
        ref: 'Client' //ref to the Client model
    },
});

module.exports = mongoose.model('Project', ProjectSchema);