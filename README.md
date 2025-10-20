# forthem
## Structure

- `/public`: ito yung main page `index.html` file.
- `/src`: dito yung react source codes.
  - `/src/assets`: mga pics and other assets.
  - `/src/components`: react components, organized roles (faculty, student, transferee).
  - `/src/style`: mga mga css (nag remove nalang ako ng mga scss).
- `/server`: backend server codes.
  - `forthem.db`: SQLite database (rerename ko palang).
  - `database.js`: dito nag coconfigure nung DB tsaka nag iinitialize nung tables.
  - `index.js`: main Express server file, tsaka API endpoints.
install mga packages
`npm install`

pang start
`npm start`

pang start (para debugging, detailed logs)
`npm run dev`

## Available Accounts

Pass: `password`.

- **Student:**
  - Username: `student`
- **Faculty:**
  - Username: `faculty`
- **Transferee Manager:**
  - Username: `transferee`
  - Login Page: `/transferee-login`