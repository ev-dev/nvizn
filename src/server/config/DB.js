import { dbConfig } from './index'
import { _DB } from '../db'

export default async () => {
  if (dbConfig.activeDB) {
    let syncedDB
    try {
      syncedDB = await _DB.sync({ force: false })
      if (syncedDB == undefined) 
        throw Error(`Error at the end of syncing DB. syncedDb: ${syncedDB}`)
    }
    catch (err) {
      console.error('Problem connecting to associations inside sync', err)
    }
  }
}