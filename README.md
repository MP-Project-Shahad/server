# مشروع تحدث العربية
## User Story

- **Landing**: This page is the main page of the site. It'll have a navigation bar, header of the site logo and main design (arabic letters), mini store section where we'll show some products that supports the campaign (تحدث العربية) or just basicaly has to do with arabic. In the store section we won't be showing product that we sell ourselves clicking on the product will take you to the store that sells it and you can order it from there. Landing page will also have a podcast section for the campaign podcast (تحدث العربية). If the user is logged in the lessons proccess will be also shown the first thing on landing page with some optional quizes.This page will be Public but some features will only show for registred users

- **Register**: On registration a user can choose his preferred language to learn arabic with (on start there will only be english), and will also choose his field of work so that we can provide him with the technical terms of that field.

- **Confirmation**: after registering a message will be sent to the user's email or phone number to confirm it his account.

- **Login**: When user account is confirmed the system will navigate him to the login page to login to his account.

- **User Page**: The system will immedietly navigate you to this page after logging in, here you can edit your personal information and add or remove you avater.

- **Discussion Page**: Public discussion  page is where users can communicate with each other and share posts and comment on other users posts.

- **Learning Page**: When user opens this page for the first time he will get to choose his arabic knowledge level, and will be starting lessons according to that option. After each lesson the user will have a test of pronunciation and listening. Pronunciation tests will allow the user to record a voice immtating one on the database and our system will compare them and show if the user passed or not. While the Listening test will provide a voice record and the user will choose it's meaning from a given sentences options. Not passing means user can't go on with the lessons plan and will have to take this lesson again. 

- **Admins**: Admins can see all users and their learning progress, and can also delete or disable any user account. They can also reset a User leassons progress or move him to the next level. 


## Routes

### Roles Routes
| HTTP METHOD | URL               | Permissions | Behavior                          |
| ----------- | ----------------- | ----------- | --------------------------------- |
| POST        | /postRole    | Privete `Authentication & Authorization`  | Create new Role                 |
| GET         | /getRoles     | Private `Authentication & Authorization` | To get userPage by user Id |


### Users Routes
| HTTP METHOD | URL               | Permissions | Behavior                          |
| ----------- | ----------------- | ----------- | --------------------------------- |
| POST        | /signUp    | Public      | Create new user                 |
| POST         | /login | Public      | Login to user account                  |
| GET         | /getUserById/:id     | Private `Authentication`     | To get userPage by user Id |
| GET         | /allUsers  | Private `Authentication & Authorization`     | Get all users for admin                     |
| PUT         | /delUser/:id      | Private `Authentication`| Delete user by id                     |
| PUT         | /editUser/:id " | Private `Authentication`| Editing user info By Id       |
| POST         | /forgotPass"     | Public      | To send a forgot password message to the use email |
| POST         | /resetPass/:id      | Private      | User will get the link on email so that he can reset his password |


### Lessons Routes
- This router is only available for admins.

| HTTP METHOD | URL               | Permissions | Behavior                          |
| ----------- | ----------------- | ----------- | --------------------------------- |
| POST        | /addLesson    | Private `Authentication & Authorization`| Create new lesson.       |
| PUT         | /delLesson/:id  |  Private `Authentication & Authorization`| Deleting a lesson by id. |
| PUT         | /editLesson/:id  | Private `Authentication & Authorization` | Editing a lesson by id. |
| GET        | /allLessons    |  Private `Authentication & Authorization`      | Getting all the lessons on Lessons page.|
| GET        | /getLesson/:id     | Private `Authentication & Authorization`      | Getting lesson information on the selected lesson page.            |


### Posts Routes
| HTTP METHOD | URL               | Permissions | Behavior                          |
| ----------- | ----------------- | ----------- | --------------------------------- |
| POST        | /addPost    | Private `Authentication`| Create new Post.       |
| PUT         | /delPost/:id  |  Private `Authentication `| Deleting a post by id. |
| PUT         | /editPost/:id  | Private `Authentication` | Editing a post by id. |
| GET        | /allPosts    |  Private `Authentication`      | Getting all the Posts on discussion page.|


### Comments Routes
| HTTP METHOD | URL               | Permissions | Behavior                          |
| ----------- | ----------------- | ----------- | --------------------------------- |
| POST        | /addComment/:id     | Private `Authentication`| Add a comment on a post.       |
| PUT         | /delComt/:id  |  Private `Authentication `| Deleting a comment by id. |
| PUT         | /editComt/:id  | Private `Authentication` | Editing a comment by id. |
| GET        | /fullPost/:id     |  Private `Authentication`      | Getting Post & the comments on it.|


### FrontPage Content Routes
| HTTP METHOD | URL               | Permissions | Behavior                          |
| ----------- | ----------------- | ----------- | --------------------------------- |
| POST        | /addContent    | Private `Authentication & Authorization`  | Adding to the Frontpage Content sections.       |
| PUT         | /delContent/:id  |  Private `Authentication & Authorization`  | Deleting content by id. |
| PUT         | /editContent/:id  |Private `Authentication & Authorization`   | Editing content by id. |
| GET        | /allContent    |  Private `Authentication & Authorization`        | Getting all the Content on Landing page.|


## Modules

### Roles Schema
| key | type       | requirment | default value   |
| ---- |---------- | ----------- | -------------- |
| role  | String    |  true    |        n/a    |
| id   |  objectId  | true     | n/a         |



### User Schema 
| key | type       | requirment | default value   | 
| ---- |---------- | ----------- | -------------- |
| userName  | String    |  true    |        n/a    |
| email   |  String  | true     | n/a         |
| password   |  String  | true     | n/a         |
| avatar   |  String  | false     | "profile photo"         |
| isActive   |  Boolean  | true     | false        |
| isDeleted   |  Boolean  | true     |false         |
| level   |  String  | true     |"didnt take placement test yet"         |
| id   |  objectId  | true     | n/a         |




### Lessons Schema 
| key | type       | requirment | default value   | 
| ---- |---------- | ----------- | -------------- |
| level  | String    |  true    |        n/a    |
| name   |  String  | true     | n/a         |
| language   |  String  | true     | n/a         |
| id   |  objectId  | true     | n/a         |


### FrontPage content Schema
| key | type       | requirment | default value   | 
| ---- |---------- | ----------- | -------------- |
| desc  | String    |  true    |        n/a    |
| name   |  String  | true     | n/a         |
| img   |  String  | true     | n/a         |
| link   |  String  | true     | n/a         |
| price   |  String  | true     | n/a        |
| id   |  objectId  | true     | n/a         |


### Posts Schema
| key | type       | requirment | default value   | 
| ---- |---------- | ----------- | -------------- |
| desc  | String    |  true    |        n/a    |
| img   |  String  | true     | n/a         |
| timeStamp  |  Date  | true     | n/a         |
| isDel   |  Boolean  | true     | false        |
| userId   |  mongoose.Schema.Types.ObjectId  | true     | ref: "User"        |
| id   |  objectId  | true     | n/a         |


### Commentcs Schema
| key | type       | requirment | default value   | 
| ---- |---------- | ----------- | -------------- |
| desc  | String    |  true    |        n/a    |
| img   |  String  | true     | n/a         |
| timeStamp  |  Date  | true     | n/a         |
| isDel   |  Boolean  | true     | false        |
| userId   |  mongoose.Schema.Types.ObjectId  | true     | ref: "User"        |
| postId   |  mongoose.Schema.Types.ObjectId  | true     | ref: "Post"        |
| id   |  objectId  | true     | n/a         |

 


## BackEnd ER Diagram

![Back ERD drawio](https://user-images.githubusercontent.com/92247858/146675963-4586a59d-3003-4425-a064-8d6c918a3ee7.png)


## BackEnd UML Diagram

![Untitled Diagram drawio (7)](https://user-images.githubusercontent.com/92247858/146669111-da74a64d-1bfa-441a-bd5e-d30afc9dc250.png)

