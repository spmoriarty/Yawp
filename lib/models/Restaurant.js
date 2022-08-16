const pool = require('../utils/pool');


module.exports = class Restaurant {

  id;
  name;
  city;
  address;
  review;
    
  constructor(row) {
    this.id = row.id,
    this.name = row.name,
    this.city = row.city;
    this.address = row.address;
    this.review = row.review || [];
  }

  static async getAll() {
    const { rows } = await pool.query(`
    SELECT * FROM eatery `);
    return rows.map((row) => new Restaurant(row));
  }


  static async getById(id) {
    const { rows } = await pool.query(`
    SELECT eatery.*,
    COALESCE(json_agg(to_jsonb(reviews))
             FILTER (WHERE reviews.id IS NOT NULL), '[]')
             AS reviews from reviews
             LEFT JOIN eatery on eatery.id = reviews.eatery_id
             WHERE eatery.id = $1
             GROUP BY eatery.id
        `, [id]);
    if (rows.length === 0) {
      return null;
    }
    return new Restaurant(rows[0]);
  }
};
