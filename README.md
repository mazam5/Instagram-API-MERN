# Instagram Auth - MERN

This is a simple Instagram authentication system built with the MERN stack. It allows users to log in using their Instagram Business/Creator accounts and provides a basic user interface to view their profile.

## Live Demo

[Frontend on Netlify](https://azam-fe-insta-api.netlify.app/)

### Backend

[Backend on Render](https://instagram-api-mern.onrender.com/)

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)

## Features

- User authentication using Instagram Business/Creator accounts
- Basic user interface to view user profile information
- Responsive design for mobile and desktop devices
- Environment variables for sensitive information
- Error handling and validation
- Best UI/UX practices
- Used React Router for navigation
- Used Axios for API calls
- Used Shadcn and Tailwind CSS for styling

## Technologies Used

### Frontend-UI

- Vite
- React.js
- TypeScript
- React Router
- Axios
- Shadcn
- Tailwind CSS

### Backend-API

- Node.js
- Express.js
- dotenv
- cors
- axios

## Installation

1. Clone the repository:

```bash
git clone https://github.com/mazam5/Instagram-Auth-MERN.git
```

2.Navigate to the project directory:

```bash
cd Instagram-Auth-MERN
```

3.Install the dependencies for both frontend and backend:

```bash
cd client
npm install
cd ../server
npm install
```

4.Create a `.env` file in the `server` directory and add your Instagram credentials:

Frontend:

```env
VITE_SERVER_BASEURL=<your_server_base_url>
```

Backend:

```env
PORT=<your_port_number>
NODE_ENV="development" or "production"
CLIENT_ID=<your_meta_app_id>
CLIENT_SECRET=<your_meta_app_secret>
API_BASE=<your_api_base_url>
FRONTEND_BASE=<your_frontend_base_url>
```

5.Start the backend server:

```bash
cd server && npm start
```

6.Start the frontend server:

```bash
cd .. && cd client && npm run dev
```

7.Open your browser and navigate to [http://localhost:5173](http://localhost:5173) to view the application.

## Usage

1. Click on the "Login with Instagram" button to initiate the authentication process.
2. You will be redirected to the Instagram login page. Enter your credentials and authorize the application.
3. After successful authentication, you will be redirected back to the application, and your profile information will be displayed.
4. You can log out by clicking the "Logout" button.
