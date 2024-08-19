# Gamiki

Welcome to Gamiki! Gamiki is a game review site where gamers can review games and post pictures, while interacting with other gamers.

### Frameworks and Libraries

### Database

# Wiki Articles

# API Documentation

### USER AUTHENTICATION/AUTHORIZATION
## Endpoint: `/`
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

### LOGIN A USER `/login`
**Description**: Logs in the user with valid credentials (email and password)and returns the current user's information.

 **Request**:
  * Method: POST
  * URL: /login
  * Headers:
    * Content-Type: application/json
      
  **Body**:
   ``` json
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

### LOGOUT USER  `/logout`

## Endpoint: `/logout`
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

### SIGNUP USER `/signup`

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
   ## Get All Post
   ## Endpoint: `/posts`
   **Description**: Retrieve all posts from the database including author information, comments, and the number of likes.

   **Response**: Success Response
   * Status Code: 200 OK- Returns all the posts in the database.
   * URL: `/posts`
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

   ## Get 1 Post `/posts/<int:id>`

   **Description**: Retrieve a post from the database by ID, including author information, comments, and the number of likes.

   **Parameters:**

   - `id` (int): ID of the post.
     
     **Response**: Success Response
      * URL: ` /posts/<int:id>`
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

     ## Create Post `/posts`
     **Authentication:** Required (logged in)
   
     **Description**: Create a new post and add it to the database.
     
      **Request**:
     * Method: POST 
         * Headers: 
       * Content-Type: application/json 
        
  **Body**:
   ```json
            {
               "Post": {
                  "title": "Post Title",
                  "body": "Post Body",
                  "image": "url"
               }
            }
```
   **Response**: Success Response 
   
   * Status Code: 201 CREATED- Returns a post information from the database.
  * Headers:
         * Content-Type: application/json 
        
  **Body**:
   ``` json
         {
         "Post": {
            "author": "Current User",
            "body": "Post Body",
            "id": 1,
            "ownerId": 3,
            "title": "Post Title",
         }
         }
```


   **Error Reposnse**: Post could not be created 
   
  * Status Code: 400 Bad Request
* Headers:
  * Content-Type: application/json 
         
**Body**:
```json
            {
            "message": "Bad Request",
            "errors": {
               "field": ["error message"]
            }
            }
 ```
   ## Update Post: ` /posts/<int:id>`

   **Authentication**: Required
   **Description**: Update a specific post in the database. The user must be logged in and be the owner of the post to updates.

   **Parameters:**
   - `id` (int): ID of the post to edit.

   **Request**:
      * Method: PUT
      * URL: `/posts/<int:id>`
      * Headers:
         * Content-Type: application/json
      **Body**:
      ```json
         {
         "title": "Updated Post title",
         "body": "Updated Post body",
         "image": "url"
         }
      ```

     **Response**: Success Response
      * Status Code: 200 OK- Returns an updated post
      * Headers:
         * Content-Type: application/json
      **Body**:
      ```json
         {
            "Post": {
               "body": "Updated Post Body",
               "title": "Updated Post Title",
            }
         }
      ```
     **Error Respone**: Post could not be updated
      * Status Code: 400 Bad Request
      **Body**:
         ```json
            {
               "message": "Bad Request",
               "errors": {
                  "field": ["error message"]
               }
            }
         ```

     **Error Response**:
     * Status Code: 401 Unauthorized
      **Body**:
         ```json
            {
            "message": "Unauthorized",
            "errors": {
               "field": ["error message"]
            }
            }
         ```

   ## Delete Post: `/posts/<int:id>`

   **Authentication**: Required
   **Description**: Delete a specific post in the database. The user must be logged in and be the owner of the post to delete.

   **Parameters**:
   - `id` (int): ID of the post to delete.

   **Response**:  Success Response
   * Status Code: 200 OK- Deleted a post.
    **Body**:
   ```json
         {
         "id": 1
         }
   ```
   **Error Response**: Post not found
   * Status Code: 404 NOT FOUND- Post could not be found.
    **Body**:
      ```json
         {
         "id": null
         }
      ```

   ## Get all comments for a post: `/posts/<int:id>/comments`

   **Description**: Get all the comments for a post from the database.
   **Parameters**:
   - `id` (int): ID of the post to get all comments of.

   **Response**:  Success Response
   * Status Code: 200 OK- Got all comments.
    **Body**:
      ```json
         {
            "Posts": [
               {
                  "id": 1,
                  "body": "Comment Body",
                  "ownerId": 2,
                  "author": "Comment Author Username"
               },
               {
                  "id": 2,
                  "body": "Another Comment Body",
                  "ownerId": 3,
                  "author": "Another Comment Author Username"
               }
            ]
         }
      ```

   **Error Response**: Post not found
   * Status Code: 404 NOT FOUND- Post could not be found.
    **Body**:
      ```json
         {
            "message": "Post could not be found"
         }
      ```

   ## Create comment for a post: `/posts/<int:id>/comments`

   **Authentication**: Required
   **Description**:Create a comment for a post from the database. User must be logged in to comment on a post.
   **Parameters**:
      - `id` (int): ID of the post to comment on.

   **Request**:
      * Method: PUT
      * URL: ` /posts/<int:id>/comments`
      * Headers:
         * Content-Type: application/json

      **Body**:
     ```json
         {
         "body": "Comment Body"
         }
      ```

   **Response**: Success Response
      * Status Code: 200 OK-  Comment created.
      * Headers:
         * Content-Type: application/json
      **Body**:
         ```json
            {
            "Comment": {
               "author": "Comment author username",
               "body": "Comment Body",
               "mainPost": {
                  "body": "Post Body",
                  "id": 1,
                  "likes" : [
                    {
                     "id": 1,
                     "post": 1,
                     "user": 1
                    }
                  ],
                  "owner": {
                     "email": "user@email.com",
                     "id": 1,
                     "username": "Post Author Username"
                  },
                  "title": "Post Title",
               },
               "ownerId": 2,
            }
            }
         ```

   **Error Response**:
   * Status Code: 400 BAD REQUEST
    **Body**:
      ```json
         {
            "message": "Bad Request",
            "errors": {
               "field": ["error message"]
            }
         }
      ```

   ## Create like for a post: `/posts/<int:id>/likes`

   **Authentication**: Required
   **Description**: Create a like for the current user for a post. User must be logged in to create a like
   **Parameters**:
      - `id` (int): ID of the post to like.
   **Method**: POST

   **Response**: Success Response
      * Status Code: 200 OK-  Like was created for post.
      * Headers:
         * Content-Type: application/json
      **Body**:
         ```json
            {
               "Like": {
                  "id": 1,
                  "post": {
                     "author": "Post Author Username",
                     "body": "Post Body",
                     "comments": [
                        {
                        "author": "Comment Author Username",
                        "body": "Comment Body",
                        "id": 1,
                        "mainPost": 1,
                        "ownerId": 2,
                     }
                     ],
                     "post_id": 1,
                     "title": "Post Title",
                  },
                  "user_id": 2
               }
            }
         ```
      **Error Response**: Post not found
      * Status Code: 404 NOT FOUND- Post could not be found.
      **Body**:
         ```json
            {
               "message": "Post could not be found"
            }
         ```

      ## Delete like for a post: `/posts/like/<int:id>`

      **Authentication**: Required
      **Description**: Remove a like for the current user for a post.
      **Method**: DELETE
      **Parameters:**
      - `id` (int): ID of post to unlike.

      **Response**: Success Response
      * Status Code: 200 OK-  Like was created for post.
      * Headers:
         * Content-Type: application/json
      **Body**:
         ```json
            {
               "id": 1
            }
         ```

      **Error Response**: Post not found
      * Status Code: 404 NOT FOUND- Post could not be found.
      **Body**:
         **Body**:
         ```json
            {
               "id": null
            }
         ```

### COMMENTS

   ## Update comment: `/comments/<int:id>`

   **Authentication:** Required
   **Description:**
   Update the body of a comment if the user is logged in and is the owner of the comment.
   **Parameters:**
   - `id` (int): ID of the comment to be updated.

   **Request**:
      * Method: PUT
      * URL: ` /comments/<int:id>`
      * Headers:
         * Content-Type: application/json

      **Body**:
        ```json
            {
               "body": "Updated comment body",
            }
         ```

   **Response**: Success Response
      * Status Code: 200 OK-  Comment was updated for the post.
      * Headers:
         * Content-Type: application/json
      **Body**:
      ```json
         {
            "Comment": {
               "author": "Comment owner username",
               "body": "Updated comment body",
               "id": 3,
               "mainPost": {
                  "body": "Post Body",
                  "post_id": 1,
                  "owner": {
                     "email": "owner@example.com",
                     "id": 2,
                     "username": "Owner Username",
                  },
                  "ownerId": 1,
                  "title": "Post Title"
            },
            "user_id": 2,
            }
         }
      ```

   **Error Response**: Unauthorized
   * Status Code: 401 UNAUTHORIZED
    **Body**:
      ```json
         {
         "message": "Not the owner of this Comment"
         }
      ```

   **Error Response**: BAD REQUEST
   * Status Code: 404 BAD REQUEST
    **Body**:
      ```json
        {
            "message": "Bad Request",
            "errors": {
               "field": ["error message"]
            }
         }
      ```

   ## Delete comment: `/comments/<int:id>`

   **Authentication:** Required
   **Description:**
   Delete the comment if the user is logged in and is the owner of the comment.
   **Parameters:**
   - `id` (int): ID of the comment to be deleted.
    **Method**: DELETE

    **Response**: Success Response
      * Status Code: 200 OK-  Comment for post was deleted.
      * Headers:
         * Content-Type: application/json
      **Body**:
         ```json
            {
               "id": 1
            }
         ```

      **Error Response**: UNAUTHORIZED
      * Status Code: 401 UNAUTHORIZED
      **Body**:
         **Body**:
         ```json
            {
               "id": null
            }
         ```
