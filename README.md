# CustomBits — Custom PC Builder & Hardware Intelligence Platform

## Start here (no install needed)
1. Extract the ZIP.
2. Double-click `OPEN-CustomBits.bat` or open `CustomBits-START-HERE.html` in Chrome.
3. Use the configurator, hardware filters, comparison table, field notes, review form, save builds and export JSON.
4. Builds/reviews are stored in this browser using localStorage. Clearing browser data removes them.

The standalone edition is intentionally dependency-free so the demo opens directly from a local file. Google Fonts are optional; system font fallbacks are included.

## What's inside
- `CustomBits-START-HERE.html` — detailed responsive single-file website, with custom CSS illustration, component configurator, catalogue search/filters, PC-vs-console comparison, six detailed guides, review wall, local saved builds, JSON export, responsive navigation and interactive halftone wordmark masthead at the top, plus dedicated login and registration pages in the React app.
- `client/` — React/Vite source edition.
- `server/` — Express/Mongoose backend source.
- `mongodb-import/` — sample documents for MongoDB Compass.
- `mongodb-import/README-MONGODB.txt` — exact Compass import steps.
- `OPEN-CustomBits.bat` — opens the standalone website.

## MongoDB Compass setup
Compass is a database client; it does not include the database server.
1. Install MongoDB Community Server: https://www.mongodb.com/try/download/community
2. Install Compass: https://www.mongodb.com/try/download/compass
3. Start the MongoDB service, open Compass and connect with `mongodb://127.0.0.1:27017`.
4. Create database `custombits`.
5. Create collections `users`, `builds`, `reviews`.
6. Open each collection → Add Data → Import JSON or CSV File → choose the matching JSON file from `mongodb-import/`.

Important: JSON import only seeds example records. The standalone HTML does not send data to MongoDB. The React/Express edition uses the `server/.env` `MONGODB_URI` and must be run separately to persist real users/builds/reviews.

## Full-stack edition
Requirements: Node.js 18+ and MongoDB Community Server running locally.
- Double-click `RUN-CUSTOMBITS-FULLSTACK.bat` to install dependencies and start the React frontend and Express backend.
- The launcher creates `server/.env` from the included example if it does not exist. For local testing, the example secret is only a development placeholder; change it before any deployment.
- The backend uses `MONGODB_URI=mongodb://127.0.0.1:27017/custombits`.
- If npm registry access is blocked, dependency installation will fail; the standalone file remains runnable but does not use MongoDB.
- The full-stack login/register form is the version that talks to the backend. The standalone HTML login is only a browser demo.

## Data and security notes
- Prices are illustrative Indian-market estimates, not live listings.
- Demo JSON contains fake/sample data only. Do not import sample users into a production database.
- Never store plaintext passwords in MongoDB. The example app's auth route should hash passwords; configure a unique secret and restrict network access for real deployments.
- PC part selection is an estimate, not a verified compatibility checker. Confirm exact socket, BIOS, memory, GPU clearance, PSU quality/connectors, and current prices before purchase.
