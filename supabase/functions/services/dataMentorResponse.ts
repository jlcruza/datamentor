import {HTTP_RESPONSE_CODES} from "../constants/httpResponseCodes.ts";

private function getCorsHeaders(req){
    // CORS: build common headers up-front so all responses can reuse them
    const origin = req.headers.get("origin") || "*";
    return {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "GET,POST,PUT,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Accept, apikey",
        "Access-Control-Allow-Credentials": "true",
    };
}

export function DataMentorResponse(req: any, statusCode: number, body: string=null): Response {
    return new Response(body,
        {
            status: statusCode,
            headers: {
                ...getCorsHeaders(req),
                "Content-Type": "application/json"
            }
        })
}

export function DataMentorResponse_OK(req: any, body): Response {
    return DataMentorResponse(req, HTTP_RESPONSE_CODES.OK, body);
}

export function DataMentorResponse_NO_CONTENT(req: any): Response {
    return DataMentorResponse(req, HTTP_RESPONSE_CODES.NO_CONTENT);
}

export function DataMentorResponse_BAD_REQUEST(req: any, body): Response {
    return DataMentorResponse(req, HTTP_RESPONSE_CODES.BAD_REQUEST, body);
}

export function DataMentorResponse_UNAUTHORIZED(req: any): Response {
    return DataMentorResponse(req, HTTP_RESPONSE_CODES.UNAUTHORIZED);
}

export function DataMentorResponse_INTERNAL_SERVER_ERROR(req: any, body): Response {
    return DataMentorResponse(req, HTTP_RESPONSE_CODES.INTERNAL_SERVER_ERROR, body);
}

export function DataMentorResponse_GATEWAY_TIMEOUT(req: any, body): Response {
    return DataMentorResponse(req, HTTP_RESPONSE_CODES.GATEWAY_TIMEOUT, body);
}