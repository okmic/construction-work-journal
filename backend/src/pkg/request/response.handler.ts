import { FastifyReply } from "fastify";
import { ErrorBadRequest, ErrorForbidden, ErrorNotAuth } from "../errors/errors";

export const successResponse = async (msg: string, data: any, reply: FastifyReply, status: number = 200) => {
    return reply
    .status(status)
    .send({
        status: 'success',
        msg,
        ...data
    })
}

export const errorResponse = async (error: any, reply: FastifyReply, alertMsg?: string, errorData?: any) => {
    if(error instanceof ErrorNotAuth) {
        return reply
        .status(401)
        .send({errorMsg: 'NOT AUTH', error: { message: error.message }, alertMsg, errorData })
    }
    if(error instanceof ErrorBadRequest) {
        return reply
        .status(400)
        .send({errorMsg: 'Validate error', error: { message: error.message }, alertMsg, errorData })
    }
    if(error instanceof ErrorForbidden) {
        return reply
        .status(403)
        .send({errorMsg: 'Forbidden', error: { message: error.message }, alertMsg, errorData })
    }
    return reply
    .status(500)
    .send({state: 'Some error', error: { message: "Server error" }, alertMsg })
}