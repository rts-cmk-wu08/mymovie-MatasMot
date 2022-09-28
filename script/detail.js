

document.addEventListener("DOMContentLoaded", () => {

    let baseURL = "https://api.themoviedb.org/3"
    let apiKey = "c36a7c9420cf2a297763abcd5a593bf1"

    let params = new URLSearchParams(window.location.search) 
    let id = params.get("id") // Hent id fra URL

    console.log(id)
    let wrapperElm = document.querySelector(".wrapper")

    let headerElm = document.createElement("header")
    headerElm.classList.add("header")
    wrapperElm.append(headerElm)
    headerElm.innerHTML = ``

    fetch(`${baseURL}/movie/${id}?api_key=${apiKey}&language=en-US`)
        .then(response => response.json())
        .then(data => { 
            console.log(data)

                let articleElm = document.createElement("article")
                articleElm.setAttribute("class", "detailMovie-article")
                articleElm.innerHTML = `

                <svg onclick="history.back()" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/> </svg>

                <button>switch</button>

                    <div class="detailPosterDiv">
                        <img class="detailPosterImg" src="https://image.tmdb.org/t/p/w500${data.backdrop_path}" alt="${data.title} poster">
                    </div>
                    <div class="box">
                        <div class="movieHeadline">
                            <h3 class="movieTitle">${data.title}</h3>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark" viewBox="0 0 16 16"> <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/> </svg>
                        </div>
                        
                        <p class="imdb"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16"> <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/> </svg> ${Math.floor(data.vote_average*10)/10}/10 IMDb</p>
                        <p class="genres"></p>
                        <div class="rlr">
                            <p class="runtime">Length <span>${Math.floor(data.runtime/60)}h ${data.runtime % 60} min</span></p>
                            <p class="language">Language <span>${data.original_language}</span></p>
                            <p class="rating">Year <span>${data.release_date.slice(0, -6)}</span></p>
                        </div>
                        <h3 class="description">Description</h3>
                        <p class="overview">${data.overview}</p>
                        <div class="castHeadline">
                            <h2>Cast</h2>
                            <a href="#">See more</a>
                        </div>
                        <div class="cast">
                            <article class="castArticles"></article>
                        </div>
                    </div>
                `
                headerElm.append(articleElm)
                let genreElm = articleElm.querySelector(".genres")

                console.log(genreElm)

                data.genres.forEach(genre => {
                    //console.log(id)
                    
                    let genreSpan = document.createElement("span")
                    genreSpan.classList.add("genre__pill")
                    genreSpan.innerText = genre.name
                    genreElm.append(genreSpan)
                })
        

    ////////////////////
    console.log(headerElm)
    let castArticleElm = articleElm.querySelector(".castArticles")
    console.log(castArticleElm)

    fetch(`${baseURL}/movie/${id}/credits?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => { 
            console.log(data)

            data.cast.forEach(movie => { 
                let article = document.createElement("article")
                article.setAttribute("class", "cast-article")
                article.innerHTML = `
                    <div class="cast-articleDiv">
                        <img class="popularPosterImg" src="https://image.tmdb.org/t/p/w500${movie.profile_path} " alt="${movie.original_name}">
                        <h3 class="actors-name">${movie.original_name}</h3>
                    </div>
                `
                castArticleElm.append(article)
        })
    })
    ////////////////////
})
})
        
    