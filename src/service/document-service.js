import Exception from "../util/exception.js";
import {
addDocumentsModel
  } from '../model/document-model.js';


export async function addDocumentsService(data){
  try{
  return  await addDocumentsModel(data)
  }catch(error){
    return error
  }
}


export class documentExpection extends Exception {
    constructor(message, status) {
        super(message, status)
    }
}
