import React from "react"

export default function WatchList({wantToWatch, watched}) {
  return (
    <>
      {wantToWatch.length > 0 && <h2>I want to watch these:</h2>}
      {wantToWatch.map(movie => (
        <div>
          <img src={movie.Poster} />
          <div>{movie.Title}</div>
        </div>
      ))}
      {watched.length  > 0 && <h2>I have already seen these:</h2>}
      {watched.map(movie => (
        <div>
          <img src={movie.Poster} />
          <div>{movie.Title}</div>
        </div>
      ))}
    </>
  )
}