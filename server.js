import app from './index.js'

import {logger} from './logger/index.js'

app.listen(8080, ()=>{
    logger.info('Server Started at port 8080');
})
