# Here is the back end web development rendering for Benjamin Carpentier (24412).

This a web application API using Node.js that can perform CRUD operations on a Mongo DB database.
The CRUD represents four primary functions for performing operations on a database
- Create (post) : To add new data
- Read (get) : To search for a specific data
- Update (put) : To change a data item
- Delete : To delete a data

This database contains data based on football teams which each have: 
- a year (Number) 
- a brand (String)
- a stadium (String)
- colours (Array)
- a number of goals per match (Number)
- an EuropeanTeam (Boolean).

---

The first thing to do is to make the necessary setup to have node.js on your computer.
Then, for run ther server use the command 'nodemon'


I created an object with caracteristics, a shema which is football team.js
I then linked this file to my index.js to create my CRUD requests.
I created a database on MongoDB which was then linked to my project. I can find all the data I create with postman in this database

ⓒ Benjamin Carpentier
