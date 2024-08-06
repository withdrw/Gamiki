# Gamiki

Welcome to Gamiki! Gamiki is a game review site where gamers can review games and post pictures, while interacting with other gamers.

### Frameworks and Libraries

### Database

# Wiki Articles

# API Documentation

### USER AUTHENTICATION/AUTHORIZATION
## Endpoint: ` /`
**Method**: GET

**Description**: Authenticates a user and returns the user's information if authenticated; else, returns an unauthorized error.

**Response**: Success Response
   * Status Code: 200
   * Headers:
      * Content-Type: application/json
   * Body:
      ```json
         {
         "id": 1,
         "username": "exampleUser",
         "email": "example@user.com"
         }
      ```

**Error Response**: Invalid credentials
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:
      ```json
            {
            "message": "Unauthorized"
            }
      ```

### LOGIN A USER
**Description**: Logs in the user with valid credentials (email and password)and returns the current user's information.

 **Request**:
  * Method: POST
  * URL: /login
  * Headers:
    * Content-Type: application/json

  **Body**:
      ```json
         {
            "email": "example@user.com",
            "password": "password"
         }
      ```

   **Response**: Successful Response
   * Status Code: 200 OK- Returns the logged in user's information once authenticated.
   * Headers:
      * Content-Type: application/json

   **Body**:
      ```json
        {
            "id": 1,
            "username": "exampleUser",
            "email": "example@user.com"
         }
      ```

   **Error Response**: Invalid credentials
   * Status Code: 401 UNAUTHORIZED
   * Headers:
   * Content-Type: application/json
   **Body**:
      ```json
         {
            "email": ["Invalid email address"],
            "password": ["Incorrect password"]
         }
      ```

### LOGOUT USER
**Method**: GET

## Endpoint: ` /logout`
**Description**: Logs out the current user and returns message.

**Response**: Success Response
   * Status Code: 200 OK- Returns message to show user has logged out.
   * Headers:
      * Content-Type: application/json
   **Body**:
      ```json
         {
         "message": "User logged out"
         }
      ```

### SIGNUP USER
**Description**:Creates a new user using username, email, and password and logs them in as the current user, while returning the current user's information.

**Request**:
  * Method: POST
  * URL: /signup
  * Headers:
    * Content-Type: application/json
  **Body**:
    ```json
         {
         "username": "newUser",
         "email": "newuser@example.com",
         "password": "newpassword"
         }
    ```
  **Response**: Success Response
  * Status Code: 200 OK- Returns the new user's information
  * Headers:
   * Content-Type: application/json
  **Body**:
   ```json
      {
         "id": 2,
         "username": "newUser",
         "email": "newuser@example.com"
      }
   ```
  **Error Response**:: User already exists with this  email
  * Status Code: 401 UNAUTHORIZED
  * Headers:
    * Content-Type: application/json
  **Body**:
   ```json
      {
         "username": ["Username already taken"],
         "email": ["Email already in use"],
         "password": ["Password is too short"]
      }
   ```

### POSTS
## Endpoint: ` /posts`
**Description**: Retrieve all posts from the database including author information, comments, and the number of likes.

**Response**: Success Response
   * Status Code: 200 OK- Returns all the posts in the database.
   * Headers:
      * Content-Type: application/json
   **Body**:
      ```json
         {
            "Posts": [
               {
                  "id": 1,
                  "author": "Author Username",
                  "body": "Post Body",
                  "title": "Post Title",
                  "comments": [
                  {
                     "author": "Comment Author Username",
                     "body": "Comment Body",
                     "id": 1,
                     "mainPost": 1,
                     "ownerId": 2,
                  }
                  ],
                  "userId" : 1,
                  "images": [
                     {
                        "imageId": 3,
                        "imageUrl": "url",
                        "postId": 1
                     }

                  ],
                  "likes": [
                     {
                        "id": 1,
                        "postId":1,
                        "userId": 1,
                     }
                  ],
                  "ownerId": 1,
                  "title": "Post Title"

               }
            ]
         }
      ```
   ## Get 1 Post
   **Description**: Retrieve a post from the database by ID, including author information, comments, and the number of likes.

   **Parameters:**

   - `id` (int): ID of the post.

   **Response**: Success Response
      URL: ` /posts/<int:id>`
      * Status Code: 200 OK- Returns a post information from the database.
      * Headers:
         * Content-Type: application/json
      **Body**:
      ```json
          {
            "Posts": [
               {
                  "id": 1,
                  "author": "Author Username",
                  "body": "Post Body",
                  "title": "Post Title",
                  "comments": [
                  {
                     "author": "Comment Author Username",
                     "body": "Comment Body",
                     "id": 1,
                     "mainPost": 1,
                     "ownerId": 2,
                  }
                  ],
                  "userId" : 1,
                  "images": [
                     {
                        "imageId": 3,
                        "imageUrl": "url",
                        "postId": 1
                     }

                  ],
                  "likes": [
                     {
                        "id": 1,
                        "postId":1,
                        "userId": 1,
                     }
                  ],
                  "ownerId": 1,
                  "title": "Post Title"

               }
            ]
         }
      ```

   **Error Response**: Post not found
   * Status Code: 401 UNAUTHORIZED
   * Headers:
      * Content-Type: application/json
   **Body**:
      ```json
         {
            "message": "Post could not be found"
         }
      ```

   ## Create Post
   **Authentication:** Required (logged in)
   **Description**: Create a new post and add it to the database.

   **Request**:
  * Method: POST
  * URL: /posts
  * Headers:
    * Content-Type: application/json
  **Body**:
    ```json
         {
         "username": "newUser",
         "email": "newuser@example.com",
         "password": "newpassword"
         }
    ```

