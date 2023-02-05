# bookrepo

# application is created on logic:
    1) userAdmin routes - only for admin role
    2) book and user routes  - for all users
    3) auth routes for deactivated ,login and singup

# I wrote some comments on some lines, I can explain some if it is needed
 (example: on admin rute i can update author book and admin book!, but i left comment because I created another endpoint for all users to updated only book that is create by that user)

I din't use git flow flow :), I was in hurry creating this app :(

only for this task -  create .env file in root project

PORT=3000
MONGO_PATH=@cluster0.ht4t6.mongodb.net/Proba?retryWrites=true&w=majority
MONGO_USER=proba
MONGO_PASSWORD=proba
JWT_SECRET=fa11ff7e07342972c7f1e7eba7c1e4d94973b0afb8112d0c5a73f418237557ea


# Start project
run project with: docker-compose up

 swagger is on route /api-docs