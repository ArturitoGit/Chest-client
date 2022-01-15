const fetch = require('electron-fetch').default
const https = require("https");

// Accept non authorized answers
const AGENT = new https.Agent({ rejectUnauthorized: false }) 

const fetch_address = (address, options) => 
    fetch(address, options)
    .then(r => r.json())
    .then (r => 
        {   // Display the answer and return it
            console.log(r)
            return r
        })

const get = (address) => {
    console.log(`Send GET request to ${address}\nResponse :`)
    return fetch_address(address, {agent: AGENT})
}

const post = ( address, params ) => 
{
    string_params = JSON.stringify(params)

    console.log(`Send POST request to ${address} with params : ${string_params}\nResponse :`)

    // Fetch the api
    return fetch_address (address, {     
            method: 'POST',
            agent: AGENT,
            headers: { 'Content-Type': 'application/json' },
            body: string_params, 
        }
    ) 
}

// Export the functions
module.exports = { get, post }

