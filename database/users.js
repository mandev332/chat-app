const UserModel = require("../schemas/usersSchema");

class Db_user {
  async find(id, filter = {}, options = {}) {
    if (id) return await UserModel.findById(id, options);
    return await UserModel.find(filter, options);
  }
  async create(user) {
    return await UserModel.create(user);
  }
  async update(id, filter = {}, data = {}) {
    if (id) return await UserModel.findByIdAndUpdate(id, data);
    return await UserModel.update(filter, data);
  }
  async delete(id, filter = {}) {
    if (id) return await UserModel.findByIdAndDelete(id);
    return await UserModel.deleteOne(filter);
  }
}

module.exports = new Db_user();
