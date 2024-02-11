import app from './index.js'
import db_conn from "./database/index.js"

app.listen(8080, async ()=>{
    // try {
    //     console.log("connecting to db");
    //     await db_conn.sync()
    // } catch (e) {
    //     console.log("error in db syncing", e);
    //     return e
    // }
})
