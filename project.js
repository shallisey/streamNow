const express = require('express');
const port = process.env.PORT || 8080
const path = require('path')

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const app = express();
const handlebars = require('express-handlebars')
const hbs = handlebars.create({
  defaultLayout:'main',
  extname: ".hbs"
});
const bodyParser = require('body-parser');
const { ppid } = require('process');
const { stringify } = require('querystring');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.engine('.hbs', handlebars(hbs));
app.set('view engine', '.hbs');
app.set('port', port);




app.use(express.static(__dirname + '/public'));

const hardCodeData = [
    {
      vote_average: 5.9,
      overview: 'An agoraphobic woman living alone in New York begins spying on her new neighbors only to witness a disturbing act of violence.',
      release_date: '2021-05-14',
      id: 520663,
      adult: false,
      backdrop_path: '/gUttUEqsrvaMlK5oL5TSQ54iE96.jpg',
      genre_ids: [ 80, 18, 9648, 53 ],
      vote_count: 58,
      original_language: 'en',
      original_title: 'The Woman in the Window',
      poster_path: '/gUnMWEtz07x5ZeNT7dOZpvDK8Hb.jpg',
      title: 'The Woman in the Window',
      video: false,
      popularity: 91.893,
      media_type: 'movie'
    },
    {
      adult: false,
      backdrop_path: '/bwfnEU7vnvbi845UBpCCRgJCZDh.jpg',
      genre_ids: [ 53, 18, 28 ],
      original_language: 'en',
      original_title: 'Those Who Wish Me Dead',
      poster_path: '/xCEg6KowNISWvMh8GvPSxtdf9TO.jpg',
      vote_count: 33,
      video: false,
      vote_average: 7.3,
      title: 'Those Who Wish Me Dead',
      overview: 'A teenage murder witness finds himself pursued by twin assassins in the Montana wilderness with a survival expert tasked with protecting him - and a forest fire threatening to consume them all.',
      release_date: '2021-05-05',
      id: 578701,
      popularity: 137.241,
      media_type: 'movie'
    },
    {
      overview: 'A woman wakes in a cryogenic chamber with no recollection of how she got there, and must find a way out before running out of air.',
      release_date: '2021-05-12',
      title: 'Oxygen',
      adult: false,
      backdrop_path: '/jedggylU3FyIN7XRAl9WY8mrT6H.jpg',
      genre_ids: [ 18, 14, 878, 53 ],
      vote_count: 154,
      original_language: 'fr',
      original_title: 'Oxygène',
      poster_path: '/u74DFoZGTcZ8cuHO8nvQkCqXEVP.jpg',
      id: 471498,
      video: false,
      vote_average: 6.9,
      popularity: 126.889,
      media_type: 'movie'
    },
    {
      genre_ids: [ 80, 18, 9648, 53 ],
      original_language: 'en',
      original_title: 'I Am All Girls',
      poster_path: '/m6bUeV4mczG3z2YXXr5XDKPsQzv.jpg',
      id: 823855,
      vote_average: 7.3,
      overview: 'A special crimes investigator forms an unlikely bond with a serial killer to bring down a global child sex trafficking syndicate.',
      release_date: '2021-05-14',
      vote_count: 3,
      video: false,
      adult: false,
      backdrop_path: '/b5eE92b5QgiHOZo5aYmCk52D8f6.jpg',
      title: 'I Am All Girls',
      popularity: 39.768,
      media_type: 'movie'
    },
    {
      adult: false,
      backdrop_path: '/3NxAiHGvIU7ExEqgN8wVlYi8gFA.jpg',
      genre_ids: [ 28, 80, 18, 53 ],
      id: 717192,
      original_language: 'nl',
      original_title: 'Ferry',
      overview: "How did it all start for Ferry Bouman, the drug lord in 'Undercover', before he was a criminal and was caught?",
      poster_path: '/w6n1pu9thpCVHILejsuhKf3tNCV.jpg',
      release_date: '2021-05-14',
      title: 'Ferry',
      video: false,
      vote_average: 7.2,
      vote_count: 6,
      popularity: 41.661,
      media_type: 'movie'
    },
    {
      adult: false,
      backdrop_path: '/3NxAiHGvIU7ExEqgN8wVlYi8gFA.jpg',
      genre_ids: [ 28, 80, 18, 53 ],
      id: 717192,
      original_language: 'nl',
      original_title: 'Ferry',
      overview: "How did it all start for Ferry Bouman, the drug lord in 'Undercover', before he was a criminal and was caught?",
      poster_path: '/w6n1pu9thpCVHILejsuhKf3tNCV.jpg',
      release_date: '2021-05-14',
      title: 'Ferry',
      video: false,
      vote_average: 7.2,
      vote_count: 6,
      popularity: 41.661,
      media_type: 'movie'
    },
    {
      adult: false,
      backdrop_path: '/3NxAiHGvIU7ExEqgN8wVlYi8gFA.jpg',
      genre_ids: [ 28, 80, 18, 53 ],
      id: 717192,
      original_language: 'nl',
      original_title: 'Ferry',
      overview: "How did it all start for Ferry Bouman, the drug lord in 'Undercover', before he was a criminal and was caught?",
      poster_path: '/w6n1pu9thpCVHILejsuhKf3tNCV.jpg',
      release_date: '2021-05-14',
      title: 'Ferry',
      video: false,
      vote_average: 7.2,
      vote_count: 6,
      popularity: 41.661,
      media_type: 'movie'
    },
    {
      adult: false,
      backdrop_path: '/3NxAiHGvIU7ExEqgN8wVlYi8gFA.jpg',
      genre_ids: [ 28, 80, 18, 53 ],
      id: 717192,
      original_language: 'nl',
      original_title: 'Ferry',
      overview: "How did it all start for Ferry Bouman, the drug lord in 'Undercover', before he was a criminal and was caught?",
      poster_path: '/w6n1pu9thpCVHILejsuhKf3tNCV.jpg',
      release_date: '2021-05-14',
      title: 'Ferry',
      video: false,
      vote_average: 7.2,
      vote_count: 6,
      popularity: 41.661,
      media_type: 'movie'
    }
  ]
  

let imageURL = "https://image.tmdb.org/t/p/w500"

// Home page
app.get('/',function(req,res){
    // TODO come back and fix css stuff
    const xhr = new XMLHttpRequest();
    let queryURL = "https://api.themoviedb.org/3/movie/550?api_key=3fe16ac899ef8daf40c2fb35b0a90b5f"
    let trendingQuery = "https://api.themoviedb.org/3/trending/movie/day?api_key=3fe16ac899ef8daf40c2fb35b0a90b5f"
    // Does need to be asynchronous
    xhr.open("GET", trendingQuery, false)

    results = []
    xhr.addEventListener('load', function () {
        if (xhr.status >= 200 && xhr.status < 400) {
            console.log("sucess", trendingQuery);

            let response = JSON.parse(xhr.responseText)
            // let movieID = response.id
            // let title = response.original_title
            // let posterPath = response.poster_path
            // let voteAverage = response.vote_average
            // let imageURL = "https://image.tmdb.org/t/p/w500" + posterPath
            
            
            
            for (i = 0; i < 9; i ++) {
                results.push(response.results[i])
            }
            
            // console.log(results);
            return results
    //         results = hardCodeData
            
        }
    })
    // console.log(results);
    xhr.send();
    // console.log(results);
    let context = {}
    context.results = results
    console.log(context);

    // let context = {}
    // context.results = hardCodeData

    res.render('home', context) //We can omit the .handlebars extension as we do bel
    

  });

app.get("/search", function(req, res) {
  
  res.render("search")

})



app.get("/credits", function(req, res) {
  res.render("credits")
  
})

app.get("/login", function(req, res) {
  res.render("login")
  
})

app.get("/:media_type/:id", function(req, res) {


  let context = {
    media_type: req.params.media_type,
    id: req.params.id,
    poster_url: "https://image.tmdb.org/t/p/w500",
    logo_url: "https://image.tmdb.org/t/p/w45",
    backdrop_url: "https://image.tmdb.org/t/p/w700"
  }

  const getURL = "https://api.themoviedb.org/3/"
  const endURL = "/watch/providers?api_key=3fe16ac899ef8daf40c2fb35b0a90b5f"
  let media_type = req.params.media_type
  let id = req.params.id
  if (media_type == "null" || id == "null") {
    console.log(`media_type: ${media_type}`);
    console.log(`id: ${id}`);
    res.render("404", context)
  }

  let req1URL = `${getURL}${media_type}/${id}${endURL}`
  console.log("api1: ", req1URL);
 

  // Grab Streaming providers
  // =======================================================

  const req1 = new XMLHttpRequest();
  req1.open("GET", req1URL, false)
  req1.addEventListener('load', function(){
    if (req1.status >= 200 && req1.status < 400) {
      let response = JSON.parse(req1.responseText)
      console.log(response.results.US);
      if (isEmpty(response.results)){
        res.render("404", context)
      }
      

      if (typeof response.results.US == "undefined") {
        context.link = null
        context.flatrate = null
        context.buy = null
        context.rent = null
      } else {
        context.link = response.results.US.link
        context.flatrate = response.results.US.flatrate
        context.buy = response.results.US.buy
        context.rent = response.results.US.rent
      }




    } else {
      console.log(`Error: ${req1.statusText}`);
    }
  })

  req1.send()
  // // =======================================================


  const end2URL = "?api_key=3fe16ac899ef8daf40c2fb35b0a90b5f&language=en-US"

  const api2URL = `${getURL}${media_type}/${id}${end2URL}`
  console.log("api2: ", api2URL);
  // Grab details
  // =======================================================
  const req2 = new XMLHttpRequest();
  req2.open("GET", api2URL, false)
  req2.addEventListener('load', function(){
    if (req2.status >= 200 && req2.status < 400) {
      let response = JSON.parse(req2.responseText)
      context.backdrop_path = response.backdrop_path

      if (media_type == "tv") {
        context.name = response.name
        context.num_of_episodes = response.number_of_episodes
        context.num_of_seasons = response.number_of_seasons
      } else {
        context.name = response.original_title
        context.imdbID = response.imdb_id
      }

      context.overview = response.overview
      context.poster_path = response.poster_path
      context.backdrop_path = response.backdrop_path
      context.popularity = response.popularity
      context.average = response.vote_average
      
  

    } else {
      console.log(`Error: ${req2.statusText}`);
    }
  })

  req2.send()
  // =======================================================
  console.log(context);
  
  res.render("providers", context)
})

app.get("/error", function(req, res) {
  res.render("404")
})



app.listen(port, () => {
    console.log(`Listening on ${port}!!!`);
})



function isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}