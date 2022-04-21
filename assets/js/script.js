const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';
const BASE_URL = 'http://localhost:8000/api/';
const API_Anime = BASE_URL + 'animes';
const API_Genre = BASE_URL + 'genres/';
const API_Genrex = BASE_URL + 'genre/';
const IMG_URL = 'http://localhost:8000/image/';

const laadGenre = async () => {
    const response = await axios.get(API_Genre)
    const json = await response.data
    let nieuweInhoud = ''
    json.map(el => {
        nieuweInhoud += `<option value="${el.id}">${el.name}</option>`
    })
    document.querySelector("#genre_id").innerHTML = nieuweInhoud
    console.log(json)
}

const voegToe = async () => {
    const title = document.querySelector("#title").value
    const author = document.querySelector("#author").value
    const release_date = document.querySelector("#release_date").value
    const genre = document.querySelector("#genre_id").value
    const Status = document.querySelector("#status").value
    const imagefile = document.querySelector('#image');
    const description = document.querySelector("#description").value
    
    var formData = new FormData();
    
    formData.append("image", imagefile.files[0]);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("author", author);
    formData.append("release_date", release_date);
    formData.append("genre_id", genre);
    formData.append("status", Status);
    
    axios.post(API_Anime, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

const genres = [
    {
        "id": 0,
        "name": "All"
    },
    {
        "id": 1,
        "name": "Action"
    },
    {
        "id": 2,
        "name": "Comedy"
    },
    {
        "id": 3,
        "name": "Sci Fi"
    }
]

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const tagsEl = document.getElementById('tags');

var lastUrl = '';


let selectedGenre = 0;
setGenre();
function setGenre() {
    tagsEl.innerHTML = '';
    genres.forEach(genre => {
        const t = document.createElement('div');
        t.classList.add('tag');
        t.id = genre.id;
        t.innerText = genre.name;
        t.addEventListener('click', () => {
            console.log(genre.id)
            selectedGenre = genre.id;  
            OnStart()          
        })
        tagsEl.append(t);
    })
}


function getMovies(url) {
    lastUrl = url;
    fetch(url).then(res => res.json()).then(data => {
        console.log(data)
        if (data.length !== 0) {
            showMovies(data);
        } else {
            main.innerHTML = `<h1 class="no-results">No Results Found</h1>`
        }
    })
}

function showMovies(data) {
    main.innerHTML = '';

    data.forEach(el => {
        const { title, image, description, id } = el;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
             <img src="${IMG_URL}${image}" alt="${image}">
            <div class="overview">
                <h3>${title}</h3>
                <p>${description}</p>
                <button class="know-more" id="${id}">Know More</button
            </div>
        
        `
        main.appendChild(movieEl);

       /* document.getElementById(id).addEventListener('click', () => {
            console.log(id)
            openNav(el)
        })*/
    })
}

async function laad() {
    await laadGenre()
}

async function OnStart(){
    if(selectedGenre >= 1){
        getMovies(API_Genrex + selectedGenre + '/animes')
    }
    else{
        getMovies(API_Anime);
    }
    
}


