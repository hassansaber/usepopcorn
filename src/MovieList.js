import Movie from "./Movie"


const MovieList = ({ movies, onSelectMovie, selectedMovie }) => {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          onSelectMovie={onSelectMovie}
          selectedMovie={selectedMovie} />
      ))}
    </ul>
  )
}

export default MovieList