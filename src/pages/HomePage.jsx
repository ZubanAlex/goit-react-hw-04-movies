import React, { Component } from "react";
import T from "prop-types";
import { Link } from "react-router-dom";
import * as API from "../services/movie_api";

class HomePage extends Component {
  static propTypes = {
    location: T.shape({
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
    API.fetchMostPopularMovies()
      .then((res) => this.setState({ movies: res.data.results }))
      .catch((err) =>
        this.setState({
          error: err.message,
        })
      );
  }

  render() {
    const { movies, error } = this.state;
    const { location } = this.props;

    return (
      <div>
        <h2>Trending today.</h2>
        {error && <p>Error...</p>}
        {movies.length > 0 && (
          <ul>
            {movies.map((movie) => (
              <li key={movie.id}>
                <Link
                  to={{
                    pathname: `/movies/${movie.id}`,
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

export default HomePage;
