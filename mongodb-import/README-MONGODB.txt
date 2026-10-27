CustomBits — MongoDB Compass import

OFFICIAL DOWNLOADS
MongoDB Compass: https://www.mongodb.com/try/download/compass
MongoDB Community Server: https://www.mongodb.com/try/download/community

Compass is a client. You must install/start Community Server too for a local database.

CONNECT
Use exactly this URI in Compass's connection-string field:
mongodb://127.0.0.1:27017

Do NOT paste `MONGODB_URI=` into Compass. That prefix is only for the backend `.env` file.

CREATE
Create database: custombits
Create collection: users
Then repeat by creating `builds` and `reviews`.

IMPORT
For each collection, open it → Add Data → Import JSON or CSV File.
- users collection: select users.json
- builds collection: select builds.json
- reviews collection: select reviews.json

Files use MongoDB Extended JSON where needed (for ObjectId/date fields). If your Compass version asks for JSON mode, choose JSON / Extended JSON as supported.

Important: This seeds example documents. It does not connect the standalone HTML app to MongoDB. The full-stack backend must be started separately for live persistence.
