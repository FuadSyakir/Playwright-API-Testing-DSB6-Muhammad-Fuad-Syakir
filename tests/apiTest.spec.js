const { test, expect } = require("@playwright/test")
const { Ajv } = require("ajv");


const ajv = new Ajv();

test('Get Request', async ({request}) => {
    const response = await request.get("https://reqres.in/api/users?page=2")
    console.log(await response.json());
    
    expect(response .status()).toEqual(200)
    expect(response .ok()).toBeTruthy ()

    const resBody = await response.json()


    const valid = ajv.validate(require("./json-schema/get-request.schema.json"), resBody);
    if (!valid) {
        console.error("AJV Validation Errors:", ajv.errorsText());
    }
    expect(valid).toBe(true);
})


test('Post Request', async ({request}) => {
    const reqHeaders = {
        Accept: 'application/json'
    }

    const body = {
        "name": "morpheus",
        "job": "leader"
    }

    const response =await request.post("https://reqres.in/api/users", {
        headers: reqHeaders, 
        data: body,
    })

    expect(response .status()).toEqual(201)
    expect(response .ok()).toBeTruthy ()

    const resBody = await response.json()
    expect(resBody.name).toEqual('morpheus')


    const valid = ajv.validate(require("./json-schema/create-request.schema.json"), resBody);
    if (!valid) {
        console.error("AJV Validation Errors:", ajv.errorsText());
    }
    expect(valid).toBe(true);
})

test('Delete Request', async ({request}) => {
    const response = await request.get("https://reqres.in/api/users/2")
    console.log(await response.json());
    
    expect(response .status()).toEqual(200)
    expect(response .ok()).toBeTruthy ()
})

test('Put Request', async ({request}) => {
    const reqHeaders = {
        Accept: 'application/json'
    }

    const body = {
        "name": "morpheus",
        "job": "zion resident"
    }

    const response =await request.post("https://reqres.in/api/users/2", {
        headers: reqHeaders, 
        data: body,
    })

    expect(response .status()).toEqual(201)
    expect(response .ok()).toBeTruthy ()

    const resBody = await response.json()
    expect(resBody.name).toEqual('morpheus')


    const valid = ajv.validate(require("./json-schema/put-update.schema.json"), resBody);
    if (!valid) {
        console.error("AJV Validation Errors:", ajv.errorsText());
    }
    expect(valid).toBe(true);
})