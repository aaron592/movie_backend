const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://ATJ:Atj@cluster0.onn2g.mongodb.net/moviesDB?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology:true,
    useCreateIndex:true

})
.then(()=>{
    
})
.catch((err)=>{
    console.log(err);
})

//Schema for movies collection
const movieSchema = new mongoose.Schema({
    name:String,
    releaseDate:String,
    boxOffice:Number,
    poster:String,
    rating:Number,
    productionCompany:String,
    description:String,
    genre:String
})

//Schema for actors collection
const actorSchema = new mongoose.Schema({
    name:String,
    age:Number,
    country:String,
    height:Number,
    weight:Number,
    pic:String

})

//Schema for movies actors collection
const bothSchema = new mongoose.Schema({
    movie_id:{type:mongoose.Schema.Types.ObjectId,ref:"movies"},
    actor_id:{type:mongoose.Schema.Types.ObjectId,ref:"actors"}
})

//model for movies collection

const movieModel = new mongoose.model('movies',movieSchema);

//model for actors collection

const actorModel = new mongoose.model("actors",actorSchema);

//model for movies actors collection

const bothModel = new mongoose.model("movies_actors",bothSchema);




const models={
    movieModel:movieModel,
    actorModel:actorModel,
    bothModel:bothModel
}

module.exports = models;