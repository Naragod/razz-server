const uuidv1 = require('uuid/v1');

const ParticipantModel = require('../models/participantModel');
const RaffleModel = require('../models/raffleModel');
const RollResultModel = require('../models/rollResultModel');

let TYPES = {
    "raffle": RaffleModel,
    "roll-result": RollResultModel,
    "participant": ParticipantModel,
};

module.exports = class TableModel{
    constructor(model, foreignid, data){
        if(TYPES[model] === undefined){
            console.log("Incorrect Model:", model);
            return;
        }
        this.model = new TYPES[model](uuidv1(), foreignid, data) || null;
    }
};