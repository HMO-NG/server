import knex from "knex";
import config from '../knexfile.js'
let db = knex(config[process.env.NODE_ENV || 'development']);

//THIS IS TO CHECK IF DATA IN A PARTICULAR FIELD ALREADY EXISTS IN THE DATABASE
export async function DoesDataExist(table_name,field_name,data) {
  const result = await db(`${table_name}`)
    .where(`${field_name}`, data)
    .first(); // Get the first matching record

  return !!result; // Returns true if the record exists, false otherwise
}
