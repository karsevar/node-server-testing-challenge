
exports.seed = function(knex) {
  return knex('makes').insert([
    {id: 1, make: 'Ford'},
    {id: 2, make: 'Toyota'},
    {id: 3, make: 'Chevy'}, 
    {id: 4, make: 'Buick'},
    {id: 5, make: 'Mitsubishi'},
    {id: 6, make: 'Honda'}
  ]);
};
