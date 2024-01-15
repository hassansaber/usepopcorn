import { useState } from "react";

import Navbar from "./Navbar";
import Main from "./Main";
import Search from "./Search";
import Logo from "./Logo";
import NumResults from "./NumResults"
import Box from "./Box";
import MovieList from "./MovieList";
import WatchedSummary from "./WatchedSummary";
import WatchedMovieList from "./WatchedMovieList";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import MovieDetails from "./MovieDetails";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorage";




export default function App() {

  // ____________HOOKS_______________
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null)

  const { movies, isLoading, error } = useMovies(query)
  const [watched, setWatched] = useLocalStorageState([], "watched")




  // _________________Handler_________________

  function handleSelectedMovie(id) {
    setSelectedId(selectedId =>
      (selectedId === id) ?
        null :
        id)
  }

  function handleCloseMovie() {
    setSelectedId(null)
  }

  function handleAddWatched(movie) {
    setWatched(watched => [...watched, movie])
  }

  function handleDeleteWatched(id) {
    setWatched(watched => watched.filter(movie => movie.imdbID !== id))
  }




  // _______________Effect__________________

  useEffect(function () {

    const controller = new AbortController()

    async function fetchMovies() {

      try {
        // reset states
        setIsLoading(true)
        setError('')

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        )
        if (!res.ok) throw new Error("Something went wrong while fetching data");

        const data = await res.json()
        if (data.Response === 'False') throw new Error("Movie not found");

        setMovies(data.Search)
        setError("")

      } catch (err) {

        if (err.name !== "AbortError") {
          setError(err.message)
          console.log(err.message);
        }

      } finally {
        setIsLoading(false)
      }

      // reset List
      if (query.length < 3) {
        setError('')
        setMovies([])
        return
      }

    }

    handleCloseMovie()
    fetchMovies()

    return function () {
      controller.abort()
    }
  }, [query])







  // ____________JSX_______________

  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {(!isLoading && !error) &&
            <MovieList
              movies={movies}
              onSelectMovie={handleSelectedMovie}
            />}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId
            ?
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}

            />
            :
            <>
              <WatchedSummary watched={watched} />

              <WatchedMovieList watched={watched} onDeleteWatched={handleDeleteWatched} />
            </>
          }
        </Box>
      </Main>
    </>
  );
}
