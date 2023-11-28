
export interface ResponseDataType {
    message: string | null;
    httpCode: number | null;
    response?: any;
    error?: any;
}


export const SetResponseData = (message: string, httpCode: number, response: any) => {

    let responseData: ResponseDataType = {
        message: null,
        httpCode: null,
        response: null,
    }

    responseData.message = message;
    responseData.httpCode = httpCode;
    responseData.response = response;
    return responseData
}
export const SetResponseError = (message: string, httpCode: number, error: any) => {
    let responseData: ResponseDataType = {
        message,
        httpCode,
        error: error.toString(),
    }
    return responseData
}