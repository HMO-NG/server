export async function addDocumentsModel(data) {
  try {

  const createdoc= {
    id:uuidv4(),
    name:data.name,
    url:data.url,
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
