

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

                let article = document.createElement("article")
                article.setAttribute("class", "detailMovie-article")
                article.innerHTML = `
                    <div class="detailPosterDiv">
                        <img class="detailPosterImg" src="https://image.tmdb.org/t/p/w500${data.backdrop_path}" alt="${data.title} poster">
                    </div>
                    <div class="box">
                        <h3 class="movieTitle">${data.title}</h3>
                        <p class="imdb">${data.vote_average}/10 IMDb</p>
                        <p class="genres"></p>
                        <div class="rlr">
                            <p class="runtime">Length <span>${data.runtime/60}h</span></p>
                            <p class="language">Language <span>${data.original_language}</span></p>
                            <p class="rating">Rating <span></span></p>
                        </div>
                        <h3 class="description">Description</h3>
                        <p class="overview">${data.overview}</p>
                    </div>
                `
                headerElm.append(article)
                let genreElm = article.querySelector(".genres")

                console.log(genreElm)

                data.genres.forEach(genre => {
                    //console.log(id)
                    
                    let genreSpan = document.createElement("span")
                    genreSpan.classList.add("genre__pill")
                    genreSpan.innerText = genre.name
                    genreElm.append(genreSpan)
                })
        })
})
        
    