// document.addEventListener("DOMContentLoaded", () => {
    
//     fetch("") // Fetch the JSON file. Den kommer tilbage med et svar.
//     //https://image.tmdb.org/t/p/original/

//         .then(response => response.json()) // Convert the response to JSON
//         .then(data => {
//             console.log(data);

//             data.bicycle.forEach(bicycle => {
//                 let link = document.createElement("a")
//                 link.setAttribute("href", `detail.html?id=${bicycle.id}`)
//                 link.innerHTML = `
//                     <h2>${bicycle.model}</h2>
//                 `

//                 document.body.append(link)
//             })
//         })
// })



document.addEventListener("DOMContentLoaded", () => { 

    console.log(genres)
    let baseURL = "https://api.themoviedb.org/3"
    let apiKey = "c36a7c9420cf2a297763abcd5a593bf1"


    let wrapperElm = document.querySelector(".wrapper")

    let headerElm = document.createElement("header")
    headerElm.classList.add("header")
    wrapperElm.append(headerElm)
    headerElm.innerHTML = `
        <h1>MyMovies</h1>
        <button>switch</button>
    `

    let mainElm = document.createElement("main")
    wrapperElm.append(mainElm)

    let footerElm = document.createElement("footer")
    wrapperElm.append(footerElm)

    let nowPlayingElm = document.createElement("section")
    nowPlayingElm.setAttribute("class", "nowPlaying")
    mainElm.append(nowPlayingElm)

    let nowPlayingHeadline = document.createElement("div")
    nowPlayingHeadline.setAttribute("class", "nowPlaying-headline")
    nowPlayingHeadline.innerHTML = `
        <h2>Now Showing</h2>
        <a href="#">See more</a>
    `
    nowPlayingElm.append(nowPlayingHeadline)

    let nowPlayingMovies = document.createElement("div")
    nowPlayingMovies.setAttribute("class", "nowPlaying-movies")
    nowPlayingElm.append(nowPlayingMovies)

    fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=c36a7c9420cf2a297763abcd5a593bf1")
        .then(response => response.json())
        .then(data => { 
            console.log(data.results)
            data.results.forEach(movie => { 
                let link = document.createElement("a")
                link.setAttribute("href", `detail.html?id=${movie.id}`)
                link.innerHTML = `
                    <div class="nowPlayingImgDiv">
                        <img class="img" src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
                    </div>
                    <h3 class="movieTitle">${movie.title}</h3>
                    <p class="imdb">${movie.vote_average}/10 IMDb</p>
                    `
                nowPlayingMovies.append(link)
            })
    })

    /////////////////////////////////////////////////////////////

    let popularElm = document.createElement("section")
    popularElm.setAttribute("class", "popular")
    mainElm.append(popularElm)

    let popularHeadline = document.createElement("div")
    popularHeadline.setAttribute("class", "popular-headline")
    popularElm.append(popularHeadline)
    popularHeadline.innerHTML = `
        <h2>Popular</h2>
        <a href="#">See more</a>
    `

    let popularMovies = document.createElement("div")
    popularMovies.setAttribute("class", "popular-movies")
    popularElm.append(popularMovies)

    fetch(`${baseURL}/movie/popular?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => { 

            console.log(data.results)

            data.results.forEach(movie => { 
                let link = document.createElement("a")
                link.setAttribute("href", `detail.html?id=${movie.id}`)
                link.setAttribute("class", "movie-link")
                link.innerHTML = `
                    <div class="popularPosterDiv">
                        <img class="popularPosterImg" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} poster">
                    </div>
                    <div>
                        <h3 class="movieTitle">${movie.title}</h3>
                        <p class="imdb">${movie.vote_average}/10 IMDb</p>
                        <p class="genres"></p>
                    </div>
                `

                popularMovies.append(link)
                let genreElm = link.querySelector(".genres")

                console.log(genreElm)

                movie.genre_ids.forEach(id => {
                    //console.log(id)

                    let currentGenre = genres.find(genre => genre.id == id)
                    //console.log(currentGenre)
                    let genreSpan = document.createElement("span")
                    genreSpan.classList.add("genre__pill")
                    genreSpan.innerText = currentGenre.name
                    genreElm.append(genreSpan)
                })
            })
    })
})