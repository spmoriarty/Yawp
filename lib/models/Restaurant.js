const pool = require('../utils/pool');


module.exports = class Restaurant {

  id;
  name;
  city;
  address;
    
  constructor(row) {
    this.id = row.id,
    this.name = row.name,
    this.city = row.city;
    this.address = row.address;
  }

  static async getAll() {
    const { rows } = await pool.query(`
    SELECT * eatery `);
    return rows.map((row) => new Restaurant(row));
  }
};
