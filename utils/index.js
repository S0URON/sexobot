import fetch from "node-fetch"
import { config } from "../config.js"


export const formatMessage = (a, b, c) => {
    return a + " want to post this following article with id=" + c + ": ``` " + b + " ```"
}

export const postArticle = async (body) => {
    const res = await fetch(`${config.apiUrl}/articles`, {
        method: "post",
        headers: {
            "content-type": "application/json",
            "method": "cors"
        },
        body: JSON.stringify(body)
    });

    const data = await res.json();

    if(res.status === 400)
        return null
    return data
}

export const validateArticle = async (body) => {
    const res = await fetch(`${config.apiUrl}/articles`, {
        method: "post",
        headers: {
            "content-type": "application/json",
            "method": "cors"
        },
        body: JSON.stringify(body)
        /*
        {
            status : "approved" / "declined"
        }
        */
    });

    const data = await res.json();

    if(res.status === 400)
        return null
    return data
}