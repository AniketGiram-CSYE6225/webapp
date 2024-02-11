import app from './index.js'
import db_conn from "./database/index.js"

app.listen(8080, async ()=>{
    try {
        await db_conn.sync()
    } catch (e) {
        console.log("error in db syncing", e);
        return e
    }
})
