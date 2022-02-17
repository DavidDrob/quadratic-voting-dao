# Quadratic Voting App for DAOs

## Demo
https://qv-dao.vercel.app/

## Description
The goal for this hackathon project was to build a multi-chain app where DAO members could vote or create new voting processes with their governance tokens. The application is powered by the Covalent API, that fetches data about DAOs and their members.

## Using the app
Visited https://qv-dao.vercel.app/ and click on the button on to top right corner to login with you wallet.
Switch to a different chain by selecting a network on the bottom left corner.
Now you can create a new voting process by clicking on 'Add a new DAO' or on the DAO where you want to create a new voting.
If you would like to take part in a voting process click on a DAO with a running voting process, choose one you would like to vote on, select you votes and confirm your voting!

## Setup

1. Setup a Mongo database called `DAOs` or change the name in `utils/dbConnect.js`.
2. Create a `.env` file in the root directory with values for `VITE_SECRET_ID`, `VITE_COVALENT_KEY` and `VITE_MONGO_ATLAS_API_KEY` if your database is hosted on mongodb atlas.
3. Run `yarn` or `npm i` to install the dependencies
4. Run `yarn dev` or `npm run dev` to start the development server

## Build

1. Build the dist folder
`npm run build` or
`yarn build` 
2. Preview the website
`npm run preview` or
`yarn preview`

## Current bugs and limitations (future plans)
- As of right now the app is using a centralized Database, which isn't the most secure way to save data. In the future we would like switch to either OrbitDB or use Signator.io to make it more decentralized and more secure 
- The redirect after creating a new voting returns a 404.
- Adding a new chain with the front-end is not possible.
- The app is not showing the current results of a voting

## Contact
- Discord: light#2019
- E-Mail: david.drobnak26@gmail.com
