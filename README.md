## Challenge

The site should consist of a homepage with a paginated list of posts in descending chronological order. Each post should show the title, description, and author, with a link to view the full post.

Creating a post should be a separate page with a simple form. Each post should have a title, description, and body. It should validate that all of these fields are filled out. The post should also have an author, which is automatically assigned as the signed in user. The author of a post should have the ability to edit and delete the post after creation.

You should be required to sign up for an account in order to create a post. For the purposes of this challenge, anyone can create an account and create a post. You can use a plug-and-play solution like devise if you want.

## Technical Requirements Met

- [x] Rails
- [x] PostgreSQL
- [x] Use webpack (in React app)
- [x] Use git
- [x] CSS framework (bootstrap)
- [x] Implemented with React front-end
- [x] Added tests (ruby at least :) )

## Installation

This challenge was implemented using Docker for the Rails && PostgreSQL backend plus a React front-end.

Before attempting the installation below be sure that you have upgraded your version of docker-compose and/or Docker Desktop. I built the app using the following version :

~~~
docker-compose version 1.28.5, build c4eb3a1f
~~~

You may be able to build on other versions of docker but maybe not.

To install the backend, git clone the repo, cd into the repo, and execute the following :

~~~
> docker-compose -f docker-compose.yml build
> docker-compose run web rake db:create
> docker-compose run web rake db:migrate
> docker-compose up
~~~

optionally run tests

~~~
> docker-compose run web rake test:models
> docker-compose run web rake test:controllers
~~~

At this point, you should be able to execute

~~~
> curl "http://localhost:3001/posts"
~~~

and receive a 401 response.

Now install the front-end by cd'ing into the ui folder of the blogzy repo and execute :

~~~
> npm install
> npm start
~~~

A new browser window shoud open with the Blogzy application running in it, if not open a new tab and go to http://localhost:3000.  
The React app uses port 3000 and the rails app uses 3001.

If the dependency gods are smiling on you, you should now have a running Blogzy app.  Enjoy!

