import { useState } from "react"
export const BuscadorPeliculas = () => {

    const urlBase = 'https://api.themoviedb.org/3/search/movie'
    const API_KEY = import.meta.env.VITE_API_KEY


    const [busqueda, setBusqueda] = useState('')
    const [peliculas, setPeliculas] = useState([])

    const handleInputChange = (e) => {
        setBusqueda(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetchPeliculas()
    }

    const fetchPeliculas = async () => {
        try {
            const response = await fetch(`${urlBase}?query=${busqueda}&api_key=${API_KEY}`)
            const data = await response.json()
            console.log(data.results);
            setPeliculas(data.results)
        } catch (error) {
            console.error('Ha ocurrido un error:', error);
        }
    }

    return (
        <>

            <div className="container">
                <h1 className="title">Buscador de Películas</h1>

                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Buscar películas o series"
                        value={busqueda}
                        onChange={handleInputChange} />
                    <button type="submit" className="search-button"><svg fill="#fff" width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z" /></svg></button>
                </form>

                <div className="movie-list">
                    {peliculas.map((pelicula) => (

                        <div key={pelicula.id} className="movie-card">
                            <img src={`https://image.tmdb.org/t/p/w500/${pelicula.poster_path}`} alt={pelicula.title} />
                            <h2>{pelicula.title}</h2>
                            <p>{pelicula.overview}</p>

                        </div>

                    ))}
                </div>


            </div>


        </>
    )
}
