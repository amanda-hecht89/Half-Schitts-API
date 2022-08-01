const pool = require('../utils/pool');
const { Quote } = require('./Quote');

class Episode {
  id;
  title;
  season;
  number;

  constructor(row) {
    console.log(row, 'row');
    this.id = row.id;
    this.title = row.title;
    this.number = row.number;
    this.season = row.season;
    this.quotes =
      row.quotes.length > 0 ? row.quotes.map((quote) => new Quote(quote)) : [];
  }

  static async getAll() {
    // implement getAll() method to return a list of Episodes with quotes
    const { rows } = await pool.query(
      `SELECT episodes.*,
      coalesce(
        json_agg(to_jsonb(quotes))
        FILTER (WHERE quotes.id IS NOT NULL), '[]'
        ) AS quotes from episodes left join quotes on quotes.episode_id = episodes.id
        group by episodes.id;`
    );
    return rows.map((row) => (new Episode(row)));
  }
}

module.exports = { Episode };
