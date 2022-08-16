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


  static async getRestId(id) {
    const { rows } = await pool.query(`
    SELECT eatery.*,
COALESCE (json_agg(to_jsonb(reviews))
          FILTER (WHERE reviews.id IS NOT NULL), '[]')
          as review from eatery
          LEFT JOIN reviews on eatery.id = reviews.eatery_id
          WHERE eatery.id = $1
          GROUP BY eatery.id

        `, [id]);
    if (rows.length === 0) {
      return null;
    }
    return new Restaurant(rows[0]);
  }

  async addReview({ user_id, eatery_id, review }) {
    const { rows } = await pool.query(
      `INSERT INTO reviews(user_id, eatery_id, review)
      VALUES ($1, $2, $3)
        RETURNING *`, 
      [user_id, eatery_id, review]
    );
    return rows[0];
  }


  static async delete(id) {
    const { rows } = await pool.query(`
    DELETE FROM reviews
    WHERE id = $1
    RETURNING *`, 
    [id]);
    return new Restaurant(rows[0]);
  }
};
