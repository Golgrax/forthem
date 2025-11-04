# ForThem Demo Version

This is a demo version of the ForThem application that works without a database. All pages are accessible and any input will work for login.

## Features

- ✅ **No Database Required** - All data is mocked and stored in memory
- ✅ **Any Input Works** - You can use any username/password to login
- ✅ **All Pages Accessible** - All routes are accessible without authentication
- ✅ **Random Demo Data** - Generates random demo data for all features

## Getting Started

### Installation

```bash
cd demo
npm install
```

### Running the Demo

```bash
npm start
```

The application will start on `http://localhost:3000`

## Usage

### Login

- **Student Login**: Use any username/password at `/student-login`
- **Faculty Login**: Use any username/password at `/faculty-login`
- **Transferee Login**: Use any username/password at `/transferee-login`

### Available Pages

#### Student Pages
- `/dashboard` - Student dashboard
- `/enrollment` - Enrollment form
- `/schedule` - Class schedule
- `/modules` - Learning modules
- `/grades` - Grades and report card
- `/assignment` - Assignments

#### Faculty Pages
- `/faculty/dashboard` - Faculty dashboard
- `/faculty/masterlist` - Student masterlist
- `/faculty/schedule` - Faculty schedule
- `/faculty/create-announcement` - Create announcements
- `/faculty/create-reminder` - Create reminders

#### Transferee Pages
- `/transferee/new-enrollee` - New enrollee information
- `/transferee/requests` - Transfer requests
- `/transferee/schedule` - Transferee schedule

#### Other Pages
- `/profile` - User profile
- `/` - Main login page

## Demo Features

- All API calls are mocked and return demo data
- Login accepts any credentials
- All forms work with mock data
- No database or backend required

## Differences from Production

- No database connection
- No authentication required
- All data is generated randomly
- API calls are replaced with mock functions
- Auto-login with demo user on mount

## Notes

This is a demo version for testing and demonstration purposes only. All data is temporary and will be reset on page refresh.

