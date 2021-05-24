

document.addEventListener("DOMContentLoaded", showAfterRadioClick(), bindSearchButton())
let apiURL = "https://api.themoviedb.org/3/search/"
const key = "3fe16ac899ef8daf40c2fb35b0a90b5f"
const apiKEY = `api_key=${key}`
const midURL = "&language=en-US&"
const endURL = "&page=1&include_adult=false"
let query = "query="

function bindSearchButton() {
    const searchForm = document.querySelector("#search-form")
    searchForm.addEventListener("submit", function (event) {
        event.preventDefault()
        console.log(searchForm);
    

        specificQuery = "multi?"
        
        specificQuery += apiKEY


        // // Grab query
        let searchQuery = searchForm.elements.searchQuery.value



        searchQuery = searchQuery.split(" ").join("%20")


        apiURL += specificQuery + midURL + "query=" +searchQuery + endURL
        console.log(apiURL);


        const req = new XMLHttpRequest();
        req.open("GET", apiURL, true)
        console.log(req);
        req.addEventListener('load', function (){
            if(req.status >= 200 && req.status < 400) {

                let response = JSON.parse(req.responseText)
                console.log("This is the data returned", response.results);
                

                let searchData = document.querySelector("#search-container")
                searchData.innerHTML = ""


                let ul = document.createElement("ul")
                ul.className = "row"
                for (i = 0; i < response.results.length; i++) {
                    let li = document.createElement("li")
                    if (response.results.length == 1) {
                        li.className = "col-12 card max-height"
                    } else {
                        li.className = "col-lg-3 col-md-4 col-sm-6 card max-height"
                    }


                    // let newCard = document.createElement("div")
                    // newCard.className = "col-lg-4 col-sm-6 card max-height "

                    let h5 = document.createElement("h5")
                    h5.className = "card-title"
                    let paragraph = document.createElement("p")
                    
                    let linkDiv = document.createElement("div")

                    let img = document.createElement("img")
                    let aTag = document.createElement("a")
                    if (response.results[i].media_type === "person") {
                        if(response.results[i].profile_path == "null"){
                            img.src = "/images/image-not-found.png"
                        } else {
                            img.src = `https://image.tmdb.org/t/p/w185${response.results[i].profile_path}`
                        }
                        
                        h5.innerHTML = `${response.results[i].name}`
                        let mediaTag = document.createElement("a")
                        let innerHTMLForMediaTag
                        if (response.results[i].known_for[0].media_type === "movie") {
                            innerHTMLForMediaTag = `${response.results[i].known_for[0].original_title}`
                        } else if (response.results[i].known_for[0].media_type === "tv") {
                            innerHTMLForMediaTag = `${response.results[i].known_for[0].original_name}`
                        }
                        mediaTag.innerHTML = innerHTMLForMediaTag
                        mediaTag.href = `/${response.results[i].known_for[0].media_type}/${response.results[i].known_for[0].id}`
                        console.log(mediaTag);
                        paragraph.innerHTML = "This person is known for their role in "
                        paragraph.append(mediaTag)
                        console.log(paragraph);
                    } else if (response.results[i].media_type === "movie") {
                        if(response.results[i].poster_path == null){

                            img.src = "/images/image-not-found.png"
                        } else {

                            img.src = `https://image.tmdb.org/t/p/w185${response.results[i].poster_path}`
                        }
                        h5.innerHTML = `${response.results[i].title}`
                        // paragraph.innerHTML = `${response.results[i].overview}`
                        aTag.href = `/${response.results[i].media_type}/${response.results[i].id}`
                    } else if (response.results[i].media_type === "tv") {
                        if(response.results[i].poster_path == null){

                            img.src = "/images/image-not-found.png"
                        } else {

                            img.src = `https://image.tmdb.org/t/p/w185${response.results[i].poster_path}`
                        }
                        
                        h5.innerHTML = `${response.results[i].original_name}`
                        // paragraph.innerHTML = `${response.results[i].overview}`
                        aTag.href = `/${response.results[i].media_type}/${response.results[i].id}`
                    }

                    let citeTag = document.createElement("a")
                    citeTag.href = `https://www.themoviedb.org/`
                    citeTag.innerHTML = "TMDb"

                    let citation = document.createElement("cite")
                    citation.innerHTML = "All images from search are from "
                    citation.append(citeTag)


                    img.className = "card-img-top img-sizer"

                    let cardBody = document.createElement("div")
                    cardBody.className = "card-body"
                    
                    
                    
                    

                    aTag.innerHTML = "Streaming providers"
                    linkDiv.appendChild(aTag)
                    
                    
                    cardBody.appendChild(h5)
                    cardBody.appendChild(paragraph)
                    // cardBody.className = "d-flex align-items-end"

                    
                    if (response.results[i].media_type === "movie" || response.results[i].media_type === "tv") {
                        cardBody.appendChild(linkDiv)
                    }
                    
                    
                    li.appendChild(img)
                    li.appendChild(citation)
                    li.appendChild(cardBody)
                    // newCard.appendChild(img)
                    // newCard.appendChild(cardBody)
                    
                    

                    // searchData.appendChild(newCard)
                    ul.appendChild(li)


                }
                searchData.appendChild(ul)
            } else {
                console.log(`Error: ${req.statusText}`);
            }
        })

        req.send()
        
        

    //     let payload = {
    //         data: apiURL
    //     }

    //     req.open("POST", "/search", true)
    //     req.setRequestHeader('Content-Type', 'application/json');
    //     req.addEventListener('load', function () {
    //         if (req.status >= 200 && req.status < 400) {
    //             console.log("success");
    //             let response = JSON.parse(req.responseText)
    //             console.log("Response here", response);
                
    //         } else {
    //             console.log(`Error: ${req.statusText}`);
    //         }
    //     })
    //     console.log("this is the payload", payload);
    //     req.send(JSON.stringify(payload))
    //     // event.preventDefault();
    
    })
    
    
}

function load (request) {
    let grabbedData = []
    request.addEventListener('load',function(){
        
        if(request.status >= 200 && request.status < 400){

            let response = JSON.parse(request.responseText);
            let data = response.results

            if (data.length === 0) {
                console.log("sorry nothing found");
            }

            for (i = 0; i < data.length; i++) {
                if (data[i].media_type === "person") {

                    grabbedData.push(grabPersonData(data[i]))

                } else if (data[i].media_type === "movie") {

                    grabbedData.push(grabMovieData(data[i]))

                } else if (data[i].media_type === "tv") {

                    grabbedData.push(grabTVData(data[i]))

                } else {
                    console.log("Something I did not account for");
                }
            }
            
                 
        } else {
            console.log("error");
            res.send(`Error: ${request.statusText}`)
        }
        
        
    })
    console.log("in load func", grabbedData);
    return grabbedData
}

function grabPersonData (person) {
    // Grab photo
    let imageURL = "https://image.tmdb.org/t/p/w185"
    profile_path = person.profile_path
    imageURL += profile_path
    

    // Grab name
    let name = person.name

    // Grab id but do not use it
    let person_id = person.id

    

    return {
        img: imageURL, 
        name: name, 
        id: person_id
    }

}



function grabMovieData (movie) {
    // Grab img
    let imageURL = "https://image.tmdb.org/t/p/w185"
    posterPath = movie.poster_path
    imageURL += posterPath

    // Grab original title
    let title = movie.original_title
    // 

    // Grab id
    let movie_id = movie.id

    return {
        img: imageURL,
        name: title,
        id: movie_id
    }
}

function grabTVData (tv) {
    console.log(tv);
    // Grab img
    let imageURL = "https://image.tmdb.org/t/p/w185"
    posterPath = tv.poster_path
    imageURL += posterPath
    // Grab title
    let title = tv.original_title

    // Grab ids
    let tv_id = tv.id

    return {
        img: imageURL,
        name: title,
        id: tv_id
    }
}

function showAfterRadioClick() {
    
    $(document).ready(function() {
        $('input[type="radio"]').click(function() {
            if($(this).attr('id') == 'movie-radio') {
                $('#show-movie').show();
                $('#show-TV').hide(); 
                $('#show-people').hide();     
                $('#show-all').hide(); 
            }
            else if ($(this).attr('id') == 'tv-radio'){
                $('#show-TV').show();
                $('#show-movie').hide(); 
                $('#show-people').hide();  
                $('#show-all').hide(); 
            }
            else if ($(this).attr('id') == 'people-radio') {
                $('#show-people').show();
                $('#show-movie').hide(); 
                $('#show-TV').hide();  
                $('#show-all').hide(); 
            } else {}
        });
     });
}
