import { FastifyInstance } from 'fastify';
import pingController from './ping.controller';

export default class PingModule {
    constructor(server: FastifyInstance) {
        this.getRoutes(server)
    }

    private getRoutes(server: FastifyInstance){

        server.get('/api/ping', {
            handler: pingController.ping
        })        
        server.post('/api/ping', {
            handler: pingController.ping
        })
        server.put('/api/ping', {
            handler: pingController.ping
        })
        server.delete('/api/ping', {
            handler: pingController.ping
        })
        server.get('/api', {
            handler: pingController.ping
        })
        server.get('/', {
            handler: pingController.ping
        })
    }
};