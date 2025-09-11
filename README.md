# RealTime-ChatApp

## Project Overview

This repository contains the backend code for a real-time chat application. It provides APIs for user authentication, messaging, and real-time communication using WebSockets.

## Key Features & Benefits

*   **User Authentication:** Secure user registration and login using bcrypt and JSON Web Tokens (JWT).
*   **Real-time Messaging:** Enables instant messaging between users using Socket.IO.
*   **Media Upload:** Supports image uploads using Cloudinary.
*   **User Management:** Provides APIs for retrieving user information and managing user profiles.
*   **Database Integration:** Uses MongoDB for storing user and message data.

## Prerequisites & Dependencies

Before you begin, ensure you have the following installed:

*   **Node.js:** (Version 16 or higher recommended) - [https://nodejs.org/](https://nodejs.org/)
*   **npm or yarn:** Package managers for JavaScript.
*   **MongoDB:** A NoSQL database - [https://www.mongodb.com/](https://www.mongodb.com/)
*   **Cloudinary Account:** For media storage.  Sign up at [https://cloudinary.com/](https://cloudinary.com/)

## Installation & Setup Instructions

Follow these steps to set up the project:

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/Rohith-gande/RealTime-ChatApp.git
    cd RealTime-ChatApp/backend
    ```

2.  **Install Dependencies:**
    ```bash
    npm install # or yarn install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the `backend/` directory with the following variables:

    ```
    PORT=5000 # Example port number
    MONGODB_URI="YOUR_MONGODB_CONNECTION_STRING" # Replace with your MongoDB connection string
    JWT_SECRET="YOUR_JWT_SECRET_KEY" # Replace with a strong secret key
    CLOUDINARY_CLOUD_NAME="YOUR_CLOUDINARY_CLOUD_NAME"
    CLOUDINARY_API_KEY="YOUR_CLOUDINARY_API_KEY"
    CLOUDINARY_API_SECRET="YOUR_CLOUDINARY_API_SECRET"
    ```

    **Note:** Replace placeholders with your actual values.  Get Cloudinary credentials from your Cloudinary dashboard.  Obtain your MongoDB connection string from your MongoDB Atlas account or local MongoDB instance.  The JWT Secret should be a randomly generated secure string.

4.  **Start the Server:**
    ```bash
    npm run dev # For development with nodemon
    # OR
    npm start # For production
    ```

    The server will start at the port specified in your `.env` file (e.g., `http://localhost:5000`).

## Usage Examples & API Documentation

### API Endpoints:

#### Authentication

*   **`POST /api/auth/signup`:** Register a new user.
    *   Request Body:
        ```json
        {
            "email": "user@example.com",
            "fullName": "John Doe",
            "password": "securePassword"
        }
        ```
    *   Response: Returns a JWT token and user information upon successful registration.

*   **`POST /api/auth/login`:** Log in an existing user.
    *   Request Body:
        ```json
        {
            "email": "user@example.com",
            "password": "securePassword"
        }
        ```
    *   Response: Returns a JWT token and user information upon successful login.

#### Messages

*   **`GET /api/messages/users`:** Get a list of users for the sidebar (excluding the logged-in user).
    *   Requires authentication (JWT token in the `Authorization` header).
    *   Response: Returns an array of user objects.



## Configuration Options

The application can be configured using environment variables defined in the `.env` file:

| Variable                  | Description                                                                                                       | Example Value                                      |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `PORT`                    | The port on which the server will listen.                                                                        | `5000`                                             |
| `MONGODB_URI`             | The connection string for your MongoDB database.                                                                | `mongodb://localhost:27017/chatapp`               |
| `JWT_SECRET`              | Secret key used to sign JSON Web Tokens.  Should be a strong, randomly generated value.                           | `supersecretkey`                                  |
| `CLOUDINARY_CLOUD_NAME`   | Your Cloudinary cloud name.                                                                                     | `your_cloud_name`                                |
| `CLOUDINARY_API_KEY`      | Your Cloudinary API key.                                                                                          | `your_api_key`                                   |
| `CLOUDINARY_API_SECRET`   | Your Cloudinary API secret.                                                                                       | `your_api_secret`                                |

## Contributing Guidelines

Contributions are welcome!  Here's how you can contribute:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive commit messages.
4.  Push your changes to your fork.
5.  Submit a pull request to the main repository.

Please follow the existing code style and conventions.

## License Information

License not specified. All rights reserved by Rohith-gande.

## Acknowledgments

*   This project utilizes the following open-source libraries:
    *   Express.js
    *   Mongoose
    *   bcryptjs
    *   jsonwebtoken
    *   Cloudinary
    *   Socket.IO


Live Here:https://realtime-chatapp-omjo.onrender.com
