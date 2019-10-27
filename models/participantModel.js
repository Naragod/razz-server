module.exports = class ParticipantModel {
  constructor(id, raffleid, data) {
    this.id = id;
    this.raffleid = raffleid;
    this.data = data;
    this.columns = ['participantId', 'raffleid', 'name'];
    this.table = 'participant';
    this.values = [this.id, this.raffleid, this.data];
  }
};
