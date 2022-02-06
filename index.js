import { Router } from 'itty-router'
import { GAClient, withGAReporting } from './lib/ga'
import { withUserContext, withUserSession } from './lib/user'
import pixel from './lib/pixel'

const router = Router()
const gaClient = GAClient.fromConfig(require("./config/ga_client.json"))

router.get('/pixel.gif', withUserContext, withGAReporting(gaClient), (request) => {
    const response = new Response(pixel, {
        headers: new Headers({
            "Content-Type": "image/gif",
        })
    })
    withUserSession(request, response)
    return response
})

// 404 Fallback, depending on Cloudflare route pattern
router.all('*', () => new Response('Not Found.', { status: 404 }))

addEventListener('fetch', event =>
    event.respondWith(router.handle(event.request))
)