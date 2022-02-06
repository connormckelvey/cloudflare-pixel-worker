export class GAClient {
    
    static fromConfig(config) {
        return new GAClient(config.beaconURL, config.uaCode)
    }
    
    constructor(beaconURL, uaCode) {
        this.beaconURL = beaconURL
        this.uaCode = uaCode
    }

    async logPageView(pagePath, ipAddr, userID, userAgent) {
        const uaCode = this.uaCode
        const beaconURL = this.beaconURL

        const values = new URLSearchParams({
            v: "1", // protocol version = 1
            t: "pageview", // hit type
            tid: uaCode, // tracking / property ID
            cid: userID, // unique client ID (server generated UUID)
            dp: pagePath, // page path
            uip: ipAddr, // IP address of the user
        })

        try {
            const res = await fetch(beaconURL, {
                method: "POST",
                headers: {
                    "User-Agent": userAgent,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: values,
            })

            console.log(`GA collector status: ${res.status}, cid: ${userID}, ip: ${ipAddr}, userAgent: ${userAgent}`)
            return
        } catch (e) {
            console.log(`GA collector POST error: ${e}`)
            return
        }
    }
}

export const withGAReporting = (client) => async (request) => {
    const { pathname } = new URL(request.url)
    const { userID, userAgent, ipAddress } = request.userContext
    await client.logPageView(pathname, ipAddress, userID, userAgent)
}