const instructionsRepository = require('../repositories/ExamInstructionsRepository')

module.exports = class RegisterApp {
  static async list () {
    return await instructionsRepository.findBy()
  }
}
