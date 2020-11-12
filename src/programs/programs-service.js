const ProgramsService = {
  getAllPrograms(knex) {
    return knex.select('*').from('saes_programs');
  },
};

module.exports = ProgramsService;
