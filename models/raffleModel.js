

module.exports = class RaffleModel {
    constructor(id, participantId, ...rolls){
        this.id = id;
        this.participantId = participantId;
        this.rolls = rolls;
        this.columns = ['raffleId', 'participantId'].concat(rolls.map((roll, i) => {
            return "roll" + i;
        }));
        this.table = "raffle";
        this.values = [this.id, this.participantId, ...this.rolls];
    }
};