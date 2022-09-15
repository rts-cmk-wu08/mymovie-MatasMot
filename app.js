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
    let wrapperElm = document.querySelector(".wrapper")
    let mainElm = document.createElement("main")
    wrapperElm.append(mainElm)

    let popularElm = document.createElement("section")
    popularElm.setAttribute("class", "popular")
    mainElm.append(popularElm)

    let popularHeadline = document.createElement("div")
    popularHeadline.setAttribute("class", "popular-headline")
    popularHeadline.innerHTML = `
        <h1>Popular</h1>
        <a href="#">Show more</a>
    `
    popularElm.append(popularHeadline)

    let popularMovies = document.createElement("div")
    popularMovies.setAttribute("class", "popular-movies")
    popularElm.append(popularMovies)

    /////////////////////////////////////////////////////////////
    


    fetch("https://api.themoviedb.org/3/movie/popular?api_key=c36a7c9420cf2a297763abcd5a593bf1")
        .then(response => response.json())
        .then(data => { 
            console.log(data.results)
            data.results.forEach(movie => { 
                let link = document.createElement("a")
                link.setAttribute("href", `detail.html?id=${movie.id}`)
                link.innerHTML = `
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
                    <h3>${movie.title}</h3>
                    <p>${movie.vote_average}/10 IMDb</p>
                    `
                popularMovies.append(link)
            })
    })
})