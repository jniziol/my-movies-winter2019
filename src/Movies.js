import React from 'react';
import {Route, Link} from 'react-router-dom';
import WatchList from './WatchList'

class Search extends React.Component {
  apiKey = '3905f9c4';
  host = "https://www.omdbapi.com/";

  state = {
    movies: [],
    query: "",
    message: "",
    wantToWatch: [],
    watched: [],
  }

  findMovies = (e) => {
    e.preventDefault();
    fetch(`${this.host}?s=${this.state.query}&apikey=${this.apiKey}`)
      .then(response => response.json())
      .then(movies => {
        if(movies.Response === 'True') {
          this.setState({movies: movies.Search, message: ""})
        } else {
          this.setState({message: movies.Error})
        }
      })
  }

  handleUpdateQuery = (query) => {
    this.setState({query});
  }

  handleWantToWatch = (movie) => {
    this.setState(currentState => ({
      wantToWatch: [...currentState.wantToWatch, movie]
    }))
  }

  isMovieInList = (movie) => {
    return (
      this.state.wantToWatch.some(m => m.imdbID === movie.imdbID) ||
      this.state.watched.some(m => m.imdbID === movie.imdbID)
    )
  }

  handleAddToWatched = (movie) => {
    this.setState(currentState => ({
      watched: [...currentState.watched, movie]
    }))
  }

  render = () => {
    return (
      <>
        <Route exact path="/" render={() => (
          <>
            <form onSubmit={this.findMovies}>
              <input onChange={(e) => this.handleUpdateQuery(e.target.value)} value={this.state.query} placeholder="Search for a movie" />
              <button>Submit</button>
            </form>
            {this.state.message && <div>{this.state.message}</div>}
            <Link to="/watchList">My Watchlist</Link>
            {this.state.movies.map(movie => (
              <div key={movie.imdbID} className="Movie">
                <img src={movie.Poster} />
                <div>{movie.Title}</div>
                {!this.isMovieInList(movie) &&
                  <>
                    <button onClick={() => this.handleAddToWatched(movie)}>Add to Watched</button>
                    <button onClick={() => this.handleWantToWatch(movie)}>Want to Watch</button>
                  </>
                }
              </div>
            ))}
          </>
        )} />

        <Route path="/watchList" render={() => (
          <WatchList wantToWatch={this.state.wantToWatch} watched={this.state.watched}/>
        )} />
      </>
    );
  }

}

export default Search;
