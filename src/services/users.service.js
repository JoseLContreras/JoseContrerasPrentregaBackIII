import UserModel from '../dao/models/user.model.js';

export default class UserService {
  static async createMany(users) {
    try {
      return await UserModel.insertMany(users);
    } catch (error) {
      throw new Error(`Error creating users: ${error.message}`);
    }
  }
  
  static async getAll() {
    return await UserModel.find().lean();
  }
}