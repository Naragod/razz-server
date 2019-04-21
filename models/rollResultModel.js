

module.exports = class RollResultModel {
    constructor(id, raffleid, participants){
        this.id = id;
        this.raffleid = raffleid;
        this.participants = participants;
        this.columns = ['rollid', 'raffleid', 'participants'];
        this.table = "roll-result";
        this.values = [this.id, this.raffleid, this.participants];
    }
};