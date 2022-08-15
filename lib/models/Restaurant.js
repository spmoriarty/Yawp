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
    SELECT * FROM eatery `);
    return rows.map((row) => new Restaurant(row));
  }


  static async getById(id) {
    const { rows } = await pool.query(`
      SELECT * FROM eatery
      WHERE id = $1`, [id]);
    if (rows.length === 0) {
      return null;
    }
    return new Restaurant(rows[0]);
  }
};
