import dotenv from "dotenv"

if(process.env.MODE !== "docker") {
    dotenv.config()
}

const value = (value: any): string  => {
    if(!value) throw new Error('Invalid env property: ' + value)
    return value as string
}

export default {
    URI: value(process.env.GATWAY_URI),
    PORT: Number(value(process.env.GATWAY_PORT)),
    MONGODB_URI: value(process.env.MONGODB_URI),
    MONGODB_NAME: value(process.env.MONGODB_NAME),
}
