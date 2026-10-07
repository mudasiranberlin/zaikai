## Ecommerce Backend (Express + Mongoose)

Same API as the original backend, but it uses MongoDB with Mongoose instead of SQLite/Sequelize.
All the URLs are in [documentation.md](documentation.md).

## Run it
1. Install NodeJS (version 18+) and MongoDB (or make a free MongoDB Atlas database).
2. In this folder run:
```
npm install
cp .env.example .env     # change MONGO_URI if you use Atlas
npm run seed             # loads the default products, cart and orders
npm start                # http://localhost:3000
```
Run `npm run seed` again (or call `POST /api/reset`) any time to put the data back to the default.

## Folders
- `models/` the 4 Mongoose models
- `routes/` one file per group of URLs
- `defaultData/` the starting data
- `seed.js` and `seedDatabase.js` load the default data
- `server.js` starts everything
