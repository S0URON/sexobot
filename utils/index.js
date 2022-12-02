import fetch from "node-fetch";
import { config } from "../config.js";

export const formatMessage = (a, b, c) => {
    return (
        a +
        " wants to post the following article with id=" +
        c +
        ": ``` " +
        b +
        " ```"
    );
};

export const postArticle = async (body) => {
    const res = await fetch(`${config.apiUrl}/articles`, {
        method: "post",
        headers: {
            "content-type": "application/json",
            method: "cors",
        },
        body: JSON.stringify(body),
    });
    if (res.status === 400) return null;
    const data = await res.json();
    return data;
};

export const createUser = async (body) => {
    const res = await fetch(`${config.apiUrl}/users`, {
        method: "post",
        headers: {
            "content-type": "application/json",
            method: "cors",
        },
        body: JSON.stringify(body),
    });

    const data = await res.json();

    if (res.status === 404) return null;
    return data;
};

export const findUserByDiscordId = async (id) => {
    const res = await fetch(`${config.apiUrl}/users/${id}`, {
        method: "get",
        headers: {
            "content-type": "application/json",
            method: "cors",
        },
    });
    if (res.status === 404) return null;
    const data = await res.json();
    return data;
};

export const validateArticle = async (id, status) => {
    const res = await fetch(`${config.apiUrl}/articles/${id}/status`, {
        method: "patch",
        headers: {
            "content-type": "application/json",
            method: "cors",
        },
        body: JSON.stringify({status}),
    });
    if (res.status === 400) return false;
    return true;
};


export const updateStyle = async (id, style) => {
    const res = await fetch(`${config.apiUrl}/articles/${id}/style`, {
        method: "patch",
        headers: {
            "content-type": "application/json",
            method: "cors",
        },
        body: JSON.stringify(style),
    });

    const data = await res.json();
    console.log(data);
    if (res.status === 400) return false;
    return true;
};