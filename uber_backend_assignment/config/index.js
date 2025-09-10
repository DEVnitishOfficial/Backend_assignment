import dotenv from 'dotenv'

function loadEnv(){
    dotenv.config()
}

loadEnv()

export const serverConfig = {
    PORT: Number(process.env.PORT) || 3005
}