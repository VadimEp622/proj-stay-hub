import configProd from './prod.mjs'
import configDev from './dev.mjs'
import dotenv from 'dotenv'
dotenv.config()


export var config
// is needed to be TRUE, so all those who build the project, will run on the same (Atlas - online) Database.
if (true || process.env.NODE_ENV === 'production') {
  config = configProd
} else {
  config = configDev
}

config.isGuestMode = false
