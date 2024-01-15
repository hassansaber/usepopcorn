import { useRef } from "react"
import { useKey } from "./useKey"

const Search = ({ query, setQuery }) => {

  // _______________STATE___________
  const inputEl = useRef(null)


  // ______________HANDLER_____________

  useKey("Enter", focusInput)

  function focusInput() {
    if (document.activeElement === inputEl.current) return
    inputEl.current.focus()
    setQuery("")
  }


  // ______________JSX______________________
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  )
}

export default Search