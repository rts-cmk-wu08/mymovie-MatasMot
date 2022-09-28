

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
                    <p class="imdb"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16"> <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/> </svg>  ${movie.vote_average}/10 IMDb</p>
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
                        <p class="imdb"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16"> <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/> </svg> ${movie.vote_average}/10 IMDb</p>
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