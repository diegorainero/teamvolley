export const convertDataURIToBinary = (dataURI) =>
    Uint8Array.from(window.atob(dataURI.replace(/^data[^,]+,/, "")), (v) =>
        v.charCodeAt(0)
    );

export const randomId = (length) => {
    let ret = Date.now().toString(16);
    let letters =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    if (ret.length > length) {
        return ret.slice(0, length);
    }
    while (ret.length < length) {
        ret += letters[Math.floor(Math.random() * letters.length)];
    }
    return ret;
};

export const isValidIP = (ip) =>
    /^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$/.test(
        ip
    );

export const asyncTimeout = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

export const copyToClipboard = async (text) => {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};

export const CheckForIndexHTMLChange = async (indexHTMLURL) => {
    try {
        let resp = await fetch(indexHTMLURL, {
            method: "get",
            mode: "cors",
            cache: "no-cache",
        });
        let text = await resp.text();
        let r = /^.*<script.*\/(main.*\.js).*$/gim.exec(text);
        if (!r || r.length < 2) {
            return;
        }
        let remoteMainScript = r.length > 1 ? r[1] : null;
        if (remoteMainScript === null) {
            return;
        }
        let localMainScript = null;
        let scripts = document.body.getElementsByTagName("script");
        for (let script of scripts) {
            let rl = /^.*\/(main.*\.js).*$/gim.exec(script.src);
            if (!rl || rl.length < 2) {
                continue;
            }
            localMainScript = rl[1];
            break;
        }
        if (localMainScript === null) {
            return;
        }
        return remoteMainScript !== localMainScript;
    } catch (err) {
        console.log(err);
        return false;
    }
};
