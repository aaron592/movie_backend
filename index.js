const express = require('express');
const mongoose = require('mongoose');
const {movieModel,actorModel,bothModel} = require('./schema-model');
const cors = require('cors');
require('dotenv').config();

const app = express();
//middleware 
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));
const PORT = process.env.PORT || 3000;

//mongodb connection
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology:true

})
.then(()=>{
    console.log("Mongodb connection successfully");
})
.catch((err)=>{
    console.log(err);
})


//API for creating new movies
app.post("/movies",(req,res)=>{
    let movie = req.body;
    let movieOBJ = new movieModel(movie);
    movieOBJ.save()
    .then((data)=>{
        res.send({message:"Movie Created",movie:data});
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"Some problem in creating movie"});
    })
})

//API to get actors based on movie 
app.get("/movies/actors/:movie_id",(req,res)=>{
    let mid = req.params.movie_id;
    movieModel.findOne({_id:mid})
    .then((movie)=>{

        let movieData = {
            movie:movie
        };
        bothModel.find({movie_id:mid}).populate('actor_id')
        .then((data)=>{
            movieData.actors = data;
            res.send(movieData);
        })
        .catch((err)=>{
            console.log(err);
            res.send({message:"Some problem in getting actors"});
        })
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"Some problem in getting movies"});
    })
   
})

//API to add cast to a movies
app.post("/movies/actors",(req,res)=>{
    let movies_actors = req.body;
    let movies_actorsOBJ = new bothModel(movies_actors);
    movies_actorsOBJ.save()
    .then(()=>{
        res.send({message:"Actor added to the movie"});
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"Some problem in adding actor"})
    })
})


//API for getting movies
app.get("/movies",(req,res)=>{
    movieModel.find()
    .then((movies)=>{
        res.send(movies);
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"Some problem in getting movies"});
    })
})

//API for getting movies using ID
app.get("/movies/:id",(req,res)=>{
    let id = req.params.id;
    movieModel.findOne({_id:id})
    .then((movie)=>{
        res.send(movie);
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"Some error in getting movies using ID"});
    })

})

//API for getting movies using production company
app.get("/movies/production/:pcom",(req,res)=>{
    let production = req.params.pcom;
    movieModel.find({productionCompany:production})
    .then((movies)=>{
        res.send(movies);
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"Some problem in getting movie using pcom"});
    })

})

//API for getting movies using genres 
app.get("/movies/genre/:genre",(req,res)=>{
    let genre = req.params.genre;
    movieModel.find({genre:genre})
    .then((movies)=>{
        res.send(movies);
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"Some problem in getting movie using genre"});
    })
})


//API for deleting movies using ID
app.delete("/movie/:id",(req,res)=>{
    let id = req.params.id;
    movieModel.deleteOne({_id:id})
    .then(()=>{
        res.send({message:"Movie deleted successfully"});
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"Some error in deleting movie using ID"});
    })
})

//API for updating movies using ID
app.put("/movie/:id",(req,res)=>{
    let id = req.params.id;
    let movie = req.body;
    movieModel.updateOne({_id:id}, movie)
    .then((data)=>{
        res.send({message:"Movie updated",movie:data});
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"Some problem in updating the movie"});
    })
})


//API for creating an actor
app.post("/actor",(req,res)=>{
    let actor = req.body;
    let actorOBJ = new actorModel(actor);
    actorOBJ.save()
    .then(()=>{
        res.send({message:"Actor created"});
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"Some error in creating an actor"});
    })
})

//API for getting all actor 
app.get("/actors",(req,res)=>{
    actorModel.find()
    .then((actors)=>{
        res.send(actors);
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"Some problem in getting actors"});
    })
})

//API for getting an actor using ID
app.get("/actors/:id",(req,res)=>{
    let id = req.params.id;
    actorModel.find({_id:id})
    .then((actor)=>{
        res.send(actor);
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"Some problem in getting actor using ID"});
    })
})

//API to delete an actor
app.delete("/actors/:id",(req,res)=>{
    let id = req.params.id;
    actorModel.deleteOne({_id:id})
    .then(()=>{
        res.send({message:"Actor deleted"});
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"Some error in deleting actors"});
    })
})

//API to update an actor 
app.put("/actors/:id",(req,res)=>{
    let id = req.params.id;
    let actor = req.body;
    actorModel.updateOne({_id:id},actor)
    .then(()=>{
        res.send({message:"Actor updated"});
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"Some error in updating movie"});
    })
})

app.listen(PORT,()=>{
    console.log(`Server started at ${PORT}`);
});
