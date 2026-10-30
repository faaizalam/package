
const origin = "https://www.ticketmaster.com";
const referer = "https://www.ticketmaster.com/";

class Headers {
    constructor(name, args) {
        this.name = name;
        this.args = args;
        
    }

    getHeaders() {
        const args = this.args;

        if (this.name === "Map") {
            return {
                url:`https://mapsapi.tmol.io/maps/geometry/3/event/${args.event?.tmEventId}/placeDetailNoKeys?useHostGrids=true&app=CCP&sectionLevel=true&systemId=HOST`,
                "User-Agent": args._cookieData.userAgent,
                "Accept": "*/*",
                Origin: origin,
                Referer: referer,
                "Content-Encoding": "gzip",
            };
        }

        if (this.name === "Facet") {
         const  unclockParam = `&unlock=${args.event?.encryptedCode}`;
            return {
              url :`https://services.ticketmaster.com/api/ismds/event/${args.event?.tmEventId}/facets?by=section+shape+attributes+available+accessibility+offer+inventoryTypes+offerTypes+description&show=places+inventoryTypes+offerTypes&embed=offer&embed=description&q=available&compress=places&resaleChannelId=internal.ecommerce.consumer.desktop.web.browser.ticketmaster.us&apikey=b462oi7fic6pehcdkzony5bxhe&apisecret=pquzpfrfz7zd2ylvtz3w5dtyse${unclockParam}`,
                "User-Agent": args._cookieData.userAgent,
                "Accept": "*/*",
                "Tmps-Correlation-Id":"94d9088f-3a47-4b6e-bea5-581f836fa3af",
                Origin: origin,
                Referer: referer,
                Cookie: args.cookie,
                ...(args.event?.["X-Tmpssmartqueuetoken"] && {
                    "X-Tmpssmartqueuetoken":
                        args.event["X-Tmpssmartqueuetoken"],
                }),
            };
        }

        throw new Error(`Unknown header type: ${this.name}`);
    }
}

module.exports = Headers;
