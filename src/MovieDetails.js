import { useEffect, useRef, useState } from "react"
import StarRating from "./StarRating"
import Loader from "./Loader"
import ErrorMessage from "./ErrorMessage"
import { useKey } from "./useKey"

const KEY = 'a55d4b56'



const MovieDetails = ({ selectedId, onCloseMovie, onAddWatched, watched, onWatched }) => {

  // ____________STATE_______________
  const [movie, setMovie] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [userRating, setUserRating] = useState(0)
  const isWatched = watched.map(movie => movie.imdbID).includes(selectedId)
  const watchedUserRating = watched.find(movie => movie.imdbID === selectedId)?.userRating

  const countRef = useRef(0)

  const { Title: title,
    Released: released,
    Runtime: runtime,
    Poster: poster,
    Genre: genre,
    imdbRating,
    Plot: plot,
    Actors: actors,
    Director: director,
    Year: year,
  } = movie





  // ________________Handler___________________
  function handleAdd() {

    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      runtime: Number(runtime.split(" ").at(0)),
      imdbRating: Number(imdbRating),
      userRating,
      countRatingDecision: countRef.current
    }

    onAddWatched(newWatchedMovie)
    onCloseMovie()
  }










  // ________________Effect___________________

  useEffect(function () {
    if (userRating) countRef.current++
  }, [userRating])

  useEffect(function () {
    async function getMovieDetails() {
      try {

        setIsLoading(true)
        setMovie({})

        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`)
        if (!res.ok) throw new Error("Something went wrong while fetching data");

        const data = await res.json()
        if (data.Response === 'False') throw new Error("Movie not found");

        setMovie(data)

      } catch (err) {

        console.log(err.message);
        setError(err.message)
      } finally {
        setIsLoading(false)
      }

    }
    getMovieDetails()
  }, [selectedId])



  useEffect(function () {
    if (!title) return
    document.title = `Movie | ${title}`

    return function () { document.title = 'usePopcorn' }
  }, [title])


  useKey("Escape", onCloseMovie)


  // ____________JSX_______________
  return (

    <div className="details">
      {isLoading && <Loader />}
      {(!isLoading && !error) &&
        <>
          <header>
            <button
              className="btn-back"
              onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt="" />
            <div className="details-overview">
              <h2 >{title}</h2>
              <p>{released} &bull; {runtime}</p>
              <p>{genre}</p>
              <p><span>⭐</span>{imdbRating} IMDB rating</p>
            </div>
          </header>
          <section >
            <div className="rating">
              {isWatched ?
                <p>You rated this movie {watchedUserRating}<span>⭐</span></p>
                :
                <>
                  <StarRating maxRating={10} size={24} onSetRating={setUserRating} />
                  {userRating > 0 && <button className="btn-add" onClick={handleAdd}>+ Add to list</button>}
                </>
              }
            </div>
            <p><em>{plot}</em></p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      }
      {error && <ErrorMessage message={error} />}
    </div>
  )
}

export default MovieDetails