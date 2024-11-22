import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("FloraApp.db")

export const init = () =>{
    const promise = new Promise((resolve, reject)=>{
        const query = 'CREATE TABLE IF NOT EXISTS sessions (localId TEXT PRIMARY KEY NOT NULL, email TEXT NOT NULL, token TEXT NOT NULL  ) '
        db.transaction(tx=> 
            tx.executeSql(query, [],(_, result)=>resolve(result),(_, result)=>reject(result)))
    })
    return promise
}