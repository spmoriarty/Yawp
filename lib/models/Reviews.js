const pool = require('../utils/pool');

module.exports = class Review {

  id;
  user_id;
  eatery_id;
  review;

  constructor(row) {
    this.id = row.id,
    this.user_id = row.user_id,
    this.eatery_id = row.eatery_id,
    this.review = row.review;
  }
  static async delete(id) {
    const { rows } = await pool.query(`
    DELETE FROM reviews
    WHERE id = $1
    RETURNING *`, 
    [id]);
    return new Review(rows[0]);
  }
};


