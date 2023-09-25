import { NextResponse } from 'next/server';
const { z } = require('zod')

const defaultResponse = {
    status: 200,
    message: "",
    data: {},
    errors: null
}

function sendResponse(response) {
    return NextResponse.json(response, {
        status: response.status
    })
}

function validateData(data, schema) {
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

module.exports = {
    defaultResponse,
    sendResponse,
    validateData
}