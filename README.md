# Cloudflare Pixel Worker

Cloudflare Pixel Worker is an example (not a library) of how use a Cloudflare Worker with an analytics provider such as Google Analytics. It is essentially a port of [Google Analytics Beacon](https://github.com/igrigorik/ga-beacon), written in Javascript and targeting Cloudflare.

## Use Cases

Some websites/platforms allow users to publish HTML, but not Javascript. Some sites support integrations with the user's Google Analytics account, but some, like in my case  (a popular online marketplace for physical goods) do not. This leaves content authors, creators, and other businesses at the mecry of the platform to provide (often limited) traffic insights.

## Usage

### Requirements

- [Wrangler](https://developers.cloudflare.com/workers/cli-wrangler)
- Nodejs + npm


### Configuration

- configure the wrangler.toml file for your Cloudflare site, worker name, and route
- configure the ./config/ga_client.json file with your Google Analytics UA Code `UA-XXXXXXXXX-X`

### Deploy

`wrangler publish`


## Contributing

I don't really see this turning into a versioned library or module of any kind. PRs are are welcome for code clarity, related examples, and documentation. 