import WatchedMovie from "./WatchedMovie"

const WatchedMovieList = ({ watched, onDeleteWatched }) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie onDeleteWatched={onDeleteWatched} movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  )
}
export default WatchedMovieList