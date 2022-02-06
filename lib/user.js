import * as cookie from 'cookie'
import { uuid } from '@cfworker/uuid'

export const withUserContext = (request) => {
    const userContext = request.userContext = {
        newUser: false,
        ipAddress: request.headers.get('CF-Connecting-IP'),
        userAgent: request.headers.get('User-Agent')
    }
    try {
        userContext.userID = getCookie(request, "cid")
        console.log(`existing userID found: ${userContext.userID}`)
    } catch (e) {
        userContext.userID = uuid()
        userContext.newUser = true
        console.log(`${e}, generated new client UUID: ${userContext.userID}`)
    }
}

export const withUserSession = (request, response) => {
    response.headers.set("Cache-Control", "no-cache, no-store, must-revalidate, private")
    response.headers.set("Expires", new Date(Date.now()).toUTCString())

    const { newUser, userID } = request.userContext
    if (newUser) {
        const userCookie = cookie.serialize("cid", userID, { sameSite: 'lax' })
        response.headers.set('Set-Cookie', userCookie)
    }
    response.headers.set("CID", userID)
}

const getCookie = (request, name) => {
    const cookies = cookie.parse(request.headers.get("Cookie") || "")
    let value = cookies[name]
    if (!value) {
        throw new Error(`no cookie with name ${cookieName}`)
    }
    return value
}
