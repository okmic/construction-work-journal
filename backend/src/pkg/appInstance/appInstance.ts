import { FastifyInstance } from "fastify";

class AppInstance {
    public app: FastifyInstance | undefined

    setApp(app: FastifyInstance) {
        this.app = app
    }

    getInstance(): FastifyInstance {
        return this.app!
    }
}

export default new AppInstance()
