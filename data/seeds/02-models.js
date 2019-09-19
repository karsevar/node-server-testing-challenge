
exports.seed = function(knex) {
  return knex('models').insert([
    {id: 1, model: 'Galaxy'},
    {id: 2, model: 'Escort'},
    {id: 3, model: 'SS'},
    {id: 4, model: 'Camry'},
    {id: 5, model: 'Lancer'},
    {id: 6, model: 'S2000'},
    {id: 7, model: 'SSR'},
    {id: 8, model: 'Fleetwood'},
    {id: 9, model: 'Civic'},
  ]);
};