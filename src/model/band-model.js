import knex from "knex";
import { v4 as uuidv4 } from 'uuid'
import config from '../knexfile.js'

let db = knex(config[process.env.NODE_ENV || 'development']);


export async function createBandModel(data) {
  try{
      const createBand = {
          id: uuidv4(),
          name: data.name,
          description: data.description,
          created_by: data.created_by,
      }
      return await db("bands").insert(createBand)
  } catch (error) {
      console.error(error)
  }

}
export async function updateBandByIdModel(id,data) {
  try{
      const updateBand = {
          name: data.name,
          description: data.description,
          is_active: data.is_active,
          created_by: data.created_by,
      }
      return await db("bands").update(updateBand).where('id', id)
  } catch (error) {
      console.error(error)
  }

}
export async function getBandByIdModel(id) {
  try{
      return await db("bands").select(
        'bands.id',
        'bands.name',
        'bands.description',
        'bands.is_active',
        'bands.created_at',
        db.raw(`concat("user"."first_name", \' \', "user"."last_name") as "created_by"`),
        db.raw(`COALESCE(json_agg(
              DISTINCT jsonb_build_object(
                'id',health_plan.id,
                'name', health_plan.plan_name
              )
          ) FILTER (WHERE health_plan.id IS NOT NULL), '[]') as linked_plans`),
        db.raw(`COALESCE(json_agg(
              DISTINCT jsonb_build_object(
                'id',provider.id,
                'name', provider.name
              )
          ) FILTER (WHERE provider.id IS NOT NULL), '[]') as linked_providers`)
      ).where('bands.id', id)
       .innerJoin('user', 'user.id', '=', 'bands.created_by')
       .leftJoin('health_plan', 'health_plan.band_id', '=', 'bands.id')
       .leftJoin('provider_linked_bands', 'provider_linked_bands.band_id', '=', "bands.id")
       .leftJoin('provider', 'provider.id', '=', 'provider_linked_bands.provider_id')
       .groupBy('bands.id', 'user.first_name', 'user.last_name',)
       .first()
  } catch (error) {
      console.error(error)
  }
}
export async function getAllBandsdModel() {
  try{
      return await db("bands").select(
        'bands.id',
        'bands.name',
        'bands.description',
        'bands.is_active',
        'bands.created_at',
        db.raw(`concat("user"."first_name", \' \', "user"."last_name") as "created_by"`)

      ).innerJoin('user', 'user.id', '=', 'bands.created_by')
  } catch (error) {
      console.error(error)
  }
}
