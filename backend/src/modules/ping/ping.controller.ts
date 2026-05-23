import { FastifyRequest, FastifyReply } from "fastify";
import { successResponse } from "../../pkg/request/response.handler";
import appconfig from "../../pkg/config/appconfig";
import { DateTime2Ru } from "../../utils/validate.util";

class PingController {
    async ping(_: FastifyRequest, reply: FastifyReply) {
        return successResponse("Pong", { uri: appconfig.URI, date: DateTime2Ru(new Date()) }, reply)
    }
}

export default new PingController()
