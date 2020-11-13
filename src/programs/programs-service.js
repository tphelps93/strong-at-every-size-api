const ProgramsService = {
  getAllPrograms(knex) {
    return knex.select('*').from('saes_programs');
  },
  insertProgram(db, newProgram) {
    return db
      .insert(newProgram)
      .into('saes_programs')
      .returning('*')
      .then(([program]) => program);
  },
  getById(db, program_id) {
    return db.from('saes_programs').select('*').where('program_id', program_id).first();
  },
  deleteProgram(db, program_id) {
    return db('saes_programs').where({ program_id }).delete();
  },
  updateProgram(db, program_id, newProgramFields) {
    return db('saes_programs').where({ program_id }).update(newProgramFields);
  },
};

module.exports = ProgramsService;
