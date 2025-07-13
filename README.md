# BookBuddy - A Book Management Web App
#### Video Demo: [Youtube Link](https://youtu.be/Ir09kE7J01w)
#### Description:

**BookBuddy** is a full-stack web application designed to help users manage and track their book collections. It features user authentication, secure access, and CRUD operations for book records. The app is built using a microservices architecture with separate services for user management and book handling, secured with JWT authentication.

This project is designed to mimic a real-world microservices system with secure authentication, RESTful APIs, and a frontend that communicates asynchronously with backend services. Whether you're a user looking to register and manage your reading list or a developer exploring modern architecture, BookBuddy offers a complete, modular example.

---

## Features

- 🔐 User Registration and Login
- 📚 Add, Edit, and Delete Books
- 🧾 View all Books in a List
- 🔒 Protected Routes (Only accessible when logged in)
- 🎨 Responsive frontend built with React
- 🔧 Backend built with Spring Boot (Microservices)
- 💬 JWT-based token authentication across both microservices

---

## Architecture Overview

- **Frontend**: React JS
- **Backend**: Java Spring Boot (2 microservices)
  - `user-service` (port 8080)
  - `book-service` (port 8082)
- **Security**: JSON Web Token (JWT)
- **Database**: PostgreSQL

---

## Frontend (React)

### Key Features:
- Register and log in using JWT-based authentication.
- Protected routes (Dashboard, Book List, Add Book) require a valid token.
- Navigation bar with logo, links, and logout option.
- Axios interceptors to auto-attach JWT to requests.
- Concise UI with modular components and routing.

### Files and Their Purposes:
- `App.js`: Defines the routing structure using React Router.
- `Login.js`, `Register.js`: Handle user authentication.
- `Dashboard.js`: Displays a welcome message to logged-in users. (Could be improved to include more information)
- `BookList.js`: Fetches and displays the user's books.
- `BookForm.js`: Form to add new books.
- `Navbar.js`: Responsive navigation component.
- `PrivateRoute.js`: Wrapper for routes requiring authentication.
- `axiosConfig.js`: Axios instances for the two backend services, including JWT header injection.

### Design Choices:
I chose to organize the frontend into `components/`, `pages/`, and `api/` folders for clarity and reusability. JWT is stored in `localStorage`, allowing persistence across sessions. For simplicity and IDE compatibility, all files use `.js` instead of `.jsx` - because I used IntelliJ IDEA Community Edition.

Also, I used ChatGPT majorly for the frontend code because I am not too familiar with frontend and react framework.

---

## Backend (Spring Boot Microservices)

### user-service (port 8080)
Handles authentication, user creation, and token generation.

**Endpoints**:
- `POST /api/users/register`: Registers a new user.
- `POST /api/users/login`: Authenticates a user to log in and returns a JWT token.

**Key Classes**:
- `User.java`, `UserRepository.java`: JPA model and persistence.
- `UserController.java`, `UserService.java`: Controller and business logic.
- `JwtUtil.java`, `JwtFilter.java`: JWT generation and validation.
- `SecurityConfig.java`: Spring Security configuration.

### book-service (port 8082)
Handles CRUD operations for books, protected by JWT.

**Endpoints**:
- `GET /api/books`: Get all books for logged-in user.
- `POST /api/books`: Add a book.
- `PUT /api/books/{id}`: Update a book.
- `DELETE /api/books/{id}`: Delete a book.

**Key Classes**:
- `Book.java`, `BookRepository.java`: JPA model and persistence.
- `BookController.java`, `BookService.java`: Controller and business logic.
- `JwtFilter.java`, `SecurityConfig.java`: Validates JWT and protects endpoints.

---

## JWT Authentication Flow

1. User registers and/or logs in.
2. Server returns a JWT token.
3. Token is stored in `localStorage` on the frontend side.
4. All requests to `/api/books/**` are sent with the token in the `Authorization` header: Authorization: Bearer <token>
5. Spring Boot JWT filters validate the token and allow access.

---

## Running the Application

### Prerequisites
- Java 17+
- Gradle
- Node.js and npm
- PostgreSQL

### Run Backend

```bash
# Run user-service
cd backend/user-service
./gradlew build
./gradlew run

# Run book-service
cd ../book-service
mvn spring-boot:run
./gradlew build
./gradlew run
```
### Run Frontend
```bash
cd ../../frontend
npm install
npm start
```

Visit http://localhost:3000 in your browser.

---

## Design Decisions

### Why Microservices?
Firstly, I chose to use SpringBoot Microservices because I am currently a Java Backend developer who uses the framework daily. I decided to use this to sharpen my skills.

There are many benefits of using microservices including separated responsibilities. user-service handles authentication, while book-service manages resources. This separation makes the codebase cleaner, easier to scale, and more realistic in enterprise settings.

### Why JWT?
JWT enables stateless, secure authentication, ideal for both microservices. Each request carries its own credentials, so no server-side sessions are needed.

### Routing and Protection
Frontend routes use a PrivateRoute wrapper to prevent unauthorized access. Backend routes are protected by JwtFilter in Spring Security.

### DTO Usage
I used DTOs (AuthRequest, BookRequest) to decouple the internal database models from external exposure and for simplicity.

### PostgreSQL
I chose PostgreSQL arbitrarily; no technical constraint drove the decision.


## AI Usage

I used ChatGPT for guidance on backend wiring (controllers and service links) and PostgreSQL setup. I also heavily relied on ChatGPT for frontend development since I’m less familiar with React. I still did the actual coding, but the AI helped break down the concepts and structure.

Also, I used AI to generate the BookBuddy application logo.


## Future Improvements

- Add token refresh mechanism and token expiration handling.
- Createlogic for book categories, ratings, and images.
- Containerize using Docker Compose for simplified and optimised deployment.
- Add integration and unit tests.
- CI/CD pipeline integration (e.g., GitHub Actions).

## Conclusion

BookBuddy is a clean, scalable, and secure full-stack project built using real-world tools and best practices. It demonstrates microservice design, secure authentication, and a responsive React interface, making it an excellent reference for future projects.
