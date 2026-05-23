import { FastifyInstance } from 'fastify';

export default class WorkFactModule {
    constructor(server: FastifyInstance) {
        this.getRoutes(server)
    }

    private getRoutes(server: FastifyInstance){
        server.post('/api/', {
            handler: () => {}
        })
    }
};