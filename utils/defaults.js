import { NextResponse } from 'next/server';

export const defaultResponse = {
    status: 200,
    message: "",
    data: {},
    errors: null
}

export function sendResponse(response) {
    return NextResponse.json(response, {
        status: response.status
    })
}

export function cartResponse(response, cart = []) {
    const resp = sendResponse(response)
    resp.cookies.set({
        name: "cart",
        value: JSON.stringify(cart),
        httpOnly: false
    })
    return resp
}

export function validateData(data, schema) {
    const validationErrors = {};

    for (const key in schema) {
        try {
            schema[key].parse(data[key]);
        } catch (error) {
            validationErrors[key] = error.message;
        }
    }

    return validationErrors;
}