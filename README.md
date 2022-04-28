# Welcome to Spofity

A mock version of Spotify made with their public API

## "Live" version

Site is live and working at https://spofity.netlify.app/ but your Spotify account would need to be whitelisted to access so hit me up if you need access our you could spin up your [own](#development).

## Introduction

This aplication uses [Spotify Web API](https://developer.spotify.com/documentation/web-api/) and [Netlify Functions](https://www.netlify.com/products/functions/). It retreives the current playing track on your Spotify account and allows the user to store it in **locally** persisted playlists. 

You can create multiple playlists and add/remove tracks from it as well as deleting existing playlists. Apart from that I added some basic controls to Play/Pause songs and move to the Previous/Next song as well.

## Disclaimer about libraries used

I used [TailwindCSS](https://tailwindcss.com/) for styles since it offers great utility classes to keep consistency accross the UI.

I used [spotify-web-api-node](https://github.com/thelinmichael/spotify-web-api-node) on the serverless functions ("backend" code) to ease up the connection with Spotify OAuth endpoints. We could have achieve the same with `node-fetch` or `axios` to avoid to use native modules.

Other than that this project relies only on **React** library

## Development

**Prerequisite:** You'll need to have the [Netlify CLI](https://remix.run/docs) installed on your machine. In case you don't, run this command from your terminal:

```sh
npm install netlify-cli -g
```

Setup you environment variables on a `.env` file on the root folder of this project. 

*Note:* Go to [Spotify for developers](https://developer.spotify.com/dashboard) to get you `CLIENT_ID` and `CLIENT_SECRET`.

```
# .env.example
# Serverless environment variables
REDIRECT_URI="http://localhost:8888/"
CLIENT_ID="YOU_SPOTIFY_API_CLIENT_ID"
CLIENT_SECRET="YOU_SPOTIFY_API_CLIENT_SECRET"

# Client environment variables (thes would be exposed to our clients)
VITE_CLIENT_ID="YOU_SPOTIFY_API_CLIENT_ID"
VITE_REDIRECT_URI="http://localhost:8888/"
VITE_API_URL="http://localhost:8888/.netlify/functions"
```

Then run this command in the root folder of this project

```sh
netlify dev
```

This would spin up both the `react` website and the `serverless` functions we are going to use authenticate the user. You should see the site running at [http://localhost:8888](http://localhost:8888) 

## Screenshots

![Player Screen](/player-screen.png)

![Playlists Screen](/playlist-screen.png)