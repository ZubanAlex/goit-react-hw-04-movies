import React, { Component, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import * as API from "../services/movie_api";
import T from "prop-types";
import routes from "../routes/routes";
import Information from "../components/Information/Information";

class MovieDetailsPage extends Component {
  static propTypes = {
    match: T.shape({
      params: T.shape({
        movieId: T.string,
      }),
    }).isRequired,
    history: T.shape({
      goBack: T.func,
      push: T.func,
    }).isRequired,
    location: T.shape({
      state: T.shape({
        from: T.shape({}),
      }),
    }).isRequired,
  };

  state = {
    movieDetails: null,
    error: null,
  };

  componentDidMount() {
    const { match } = this.props;
    API.fetchDetailsAboutMovie(match.params.movieId)
      .then((res) => this.setState({ movieDetails: res.data }))
      .catch((err) =>
        this.setState({
          error: err.message,
        })
      );
  }

  onGoBack = () => {
    const { history, location } = this.props;

    if (location.state) {
      history.goBack();
      return;
    }

    history.push(routes.MOVIES_PAGE.path);
  };

  render() {
    const { match, location } = this.props;
    const { movieDetails, error } = this.state;

    return (
      <>
        {error && <h2>Error...</h2>}
        {movieDetails && (
          <>
            <button type="button" onClick={this.onGoBack}>
              Go back
            </button>
            <h2>{movieDetails.original_title}</h2>
            <p>{`User score: ${movieDetails.vote_average}`}</p>
            <h3>Overview</h3>
            <p>{movieDetails.overview}</p>
            <h4>Genres</h4>
            {movieDetails.genres.length > 0 && (
              <ul>
                {movieDetails.genres.map((genre) => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>
            )}
            <img
              src={`${API.imageURLBaseWidth300}${movieDetails.poster_path}`}
              alt={movieDetails.original_title}
            />
            <Information movieId={match.params.movieId} location={location} />
            <Suspense fallback={<h2>Loading...</h2>}>
              <Switch>
                <Route
                  path={routes.CAST_PAGE.path}
                  component={routes.CAST_PAGE.component}
                />
                <Route
                  path={routes.REVIEWS_PAGE.path}
                  component={routes.REVIEWS_PAGE.component}
                />
              </Switch>
            </Suspense>
          </>
        )}
      </>
    );
  }
}
export default MovieDetailsPage;
