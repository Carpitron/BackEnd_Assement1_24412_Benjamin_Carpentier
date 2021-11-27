//declaration and imports
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const FootballTeam = require('./footballTeam.js')


// const path = require('path');

//app plugins or librairies
app.use(bodyParser.urlencoded({ extended: false }))

// let arsenal = new FootballTeam(1886, 'Adidas', 'EmiratesStadium', ["red", "white"], 1.75, false);
// // console.log(arsenal);
// let bayern = new FootballTeam(1900, 'Adidas', 'AllianzArena', ["red", "white"], 2.23, true);
// console.log(arsenal);

// let teams = [arsenal, bayern]


app.get('/', (req, res) => {
    //Find and save all teams in the database in the "result" variable.
    //To access all team entries from the database, use the Model established in the footballteam.js file.
    FootballTeam.find((err, result) => {
        //in case there is an error with our Team model, we we will send it to the user(postman)
        if (err) {
            res.send("Error occured no FootballTeam retrieved")
            return
        }
        //if no error send the array conting teams to the user/postman
        res.send(result)
            //log the result in the console as well
        console.log(result)
    })
    console.log("something to do!!")
})


// FIND ONE BY ID, using a GET REQUEST and A PARAMETER (id)
app.get('/team/:id', (req, res) => {
        const id = req.params.id;
        // we use the findById query.
        // this query only returns one element
        FootballTeam.findById(id, (err, team) => {
            if (err) {
                res.send("Team not found")

            }
            //"team" is an object file retrieved from the database
            //"team" will only be defined if there is a team with the specific id
            // inside the Database
            // for a wrong ID, "team" will be undefined

            //we will send it back to the user/postman
            res.send(team)
            console.log(team)
        })
    })
    // app.get('/message', (req, res) => {
    //     res.send('Arsenal is the biggest club in the world.')
    // })


//insert request using POST to add a team into the database
app.post('/team', (req, res) => {
    console.log("Inserting a team in the database")
        //inser the team into the database
        // team.save() // insert the team into the database

    let EuropeanTeam = false;
    if (req.body.EuropeanTeam === 'true') {
        EuropeanTeam = true;
    }
    let team = new FootballTeam({
        year: parseInt(req.body.year),
        brand: req.body.brand,
        stadium: req.body.stadium,
        colors: req.body.colors,
        GoalsPerMatch: req.body.GoalsPerMatch,
        EuropeanTeam: EuropeanTeam
    });
    //inserting a team and checking to see if any errors occured
    console.log(req.body.colors)

    team.save(err => {
        if (err) {
            // if error send a message to let the user know
            res.send(`Team not inseted into the database, error is: ${err}`)
            return
        }
        //send a message to the user with the result
        res.send(`Team inserted into the database`)
        console.log("Team is in the database")
    })
})



// PUT request to update or modify one team from the database
app.put('/team/:id', (req, res) => {
    // you can use fineOneAndUpdate() see https://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate
    // or
    // you can use findByIdAndUpdate() see https://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate
    // You can use req.params.id to send the _id and req.body for your new variables
    // or you can send all variables, including id, in req.body
    console.log("Trying to edit team")
    console.log(parseInt(req.body.GoalsPerMatch))


    FootballTeam.findByIdAndUpdate(req.params.id, {
        brand: req.body.brand,
        stadium: req.body.stadium,
        colors: req.body.colors,
        year: ((parseInt(req.body.year) == NaN) ? 0 : parseInt(req.body.year)),
        GoalsPerMatch: req.body.GoalsPerMatch,
        EuropeanTeam: (req.body.EuropeanTeam === 'true')
    }, err => {
        if (err) {
            res.send("It didn't edit. The error is: " + err)
            return;
        }
        res.send("It did edit")
    })
})

//delete request using DELETE and a PARAMETER (id)
app.delete('/team/:id', (req, res) => {

    //We can also use findOneAndDelete({_id:}) or findByIdAndDelete(id)
    FootballTeam.findByIdAndDelete(req.params.id, err => {
        if (err) {
            res.send("Team did not delete")
            return
        }
        res.send("Team deleted")
        console.log(`Team with id ${req.params.id} is now deleted`)
            // console.log("Team with id "+req.params.id + "is now deleted")
    })
})

app.listen(port, () => {
    mongoose.connect('mongodb+srv://carpitron:berthier77@cluster0.xzsfd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority').
    catch(error => console.log(error));
    console.log(`Example app listening at http://localhost:${port}`)
})