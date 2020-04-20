import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as API from "../services/movie_api";
import T from "prop-types";
import Searchbar from "../components/SearchBar/SearchBar";

class Movies extends Component {
  static propTypes = {
    match: T.shape({
      url: T.string.isRequired,
      params: T.shape({
        movieId: T.string,
      }),
    }).isRequired,
    history: T.shape({
      push: T.func,
    }).isRequired,
    location: T.shape({
      search: T.string.isRequired,
      state: T.shape({
        from: T.shape({}),
      }),
    }).isRequired,
  };

  state = {
    movies: [],
    error: null,
  };

  componentDidMount() {
    const { location } = this.props;

    if (location.search) {
      const searchParams = new URLSearchParams(location.search).get("query");
      this.onSearch(searchParams);
    }
  }

  onSearch = (query) => {
    API.fetchMovieByQuery(query)
      .then((res) => {
        this.setState({
          movies: res.data.results,
        });
        const { location, history } = this.props;
        history.push({
          ...location,
          search: `query=${query}`,
        });
      })
      .catch((err) =>
        this.setState({
          error: err.message,
        })
      );
  };

  render() {
    const { movies, error } = this.state;
    const { match, location } = this.props;

    return (
      <div>
        <Searchbar onSubmit={this.onSearch} />
        {error && <p>Error...</p>}
        {movies.length > 0 && (
          <ul>
            {movies.map((movie) => (
              <li key={movie.id}>
                <Link
                  to={{
                    pathname: `${match.url}/${movie.id}`,
                    state: { from: { ...location } },
                  }}
                >
                  {movie.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default Movies;
