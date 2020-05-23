const { base62 } = require("../util");
let _id = 11111;

class Record {
  constructor() {
    this.data = [];
  }

  addRecord(data) {
    let id = base62.encode(_id);
    data.id = id;
    this.data.unshift(data);
    _id++;
    return data;
  }

  updateRecord(id, data) {
    let index = this.data.findIndex(res => res.id === id);
    if (index < 0) return false;
    this.data[index] = data;
    return data;
  }

  updateRecords(records) {
    for (let record of records) this.updateRecord(record.id, record);
  }

  getRecords() {
    return this.data;
  }

  deleteRecord(id) {
    let index = this.data.findIndex(res => res.id === id);
    if (index < 0) return false;
    this.data.splice(index, index + 1);
  }

  deleteRecords(ids) {
    for (let id of ids) this.deleteRecord(id);
  }
}

module.exports = new Record();
