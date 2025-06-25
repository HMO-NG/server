import knex from "knex";
import { v4 as uuidv4 } from 'uuid'
import config from '../knexfile.js'
let db = knex(config[process.env.NODE_ENV || 'development']);

export async function addDocumentsModel(data) {
  try {

  const createdoc= {
    id:uuidv4(),
    name:data.name,
    url:data.url,
    doc_type:data.doc_type,
    user_type:data.user_type,
    user_id:data.user_id,
    created_by:data.created_by,

}


  return await db('documents').insert(createdoc)
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function getDocumentsModel(id) {
  try {
    return await db('documents').select('*').where({ 'id': id }).first();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
