document.getElementById('btnGet').addEventListener('click', () => {
    buscarPeliculas();
});

async function buscarPeliculas() {
    const query = document.getElementById('searchInput').value;
    const url = `http://www.omdbapi.com/?s=${query}&apikey=1bcc8ed6`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.Response === 'True') {
            mostrarPeliculas(data.Search);
        } else {
            mostrarError(data.Error);
        }
    } catch (error) {
        mostrarError('No se pudo recibir los datos :(');
    }
}

async function mostrarPeliculas(movies) {
    const results = document.getElementById('results');
    results.innerHTML = '';

    for (const movie of movies) {
        const movieDetailUrl = `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=1bcc8ed6`;
        try {
            const movieResponse = await fetch(movieDetailUrl);
            const movieData = await movieResponse.json();
            mostrarPelicula(movieData, results);
        } catch (error) {
            mostrarError('No se pudo recibir los datos de la película :(');
        }
    }
}

function mostrarPelicula(movie, container) {
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-card', 'col-lg-4', 'col-md-6', 'col-sm-12', 'mb-3');
    movieElement.innerHTML = `
        <div class="card h-100">
            <img src="${movie.Poster !== 'No hay datos :(' ? movie.Poster : 'placeholder.jpg'}" class="card-img-top" alt="${movie.Title}">
            <div class="card-body">
                <h4 class="card-title">${movie.Title}</h4>
                <h6 class="card-text"><strong>Año:</strong> ${movie.Year}</h6>
                <h6 class="card-text"><strong>Director:</strong> ${movie.Director}</h6>
            </div>
        </div>
    `;
    container.appendChild(movieElement);
}

function mostrarError(mensaje) {
    const results = document.getElementById('results');
    let traducirMensaje;
    if (mensaje === 'Movie not found!') {
        traducirMensaje = 'Película no encontrada :(';
    } else if (mensaje === 'Too many results.') {
        traducirMensaje = 'Demasiados resultados.';
    } else {
        traducirMensaje = mensaje;
    }
    results.innerHTML = `<div class="col-12"><h5>${traducirMensaje}</h5></div>`;
}
