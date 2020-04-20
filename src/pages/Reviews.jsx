import React, { Component } from "react";
import * as API from "../services/movie_api";
import T from "prop-types";

class Reviews extends Component {
  static propTypes = {
    match: T.shape({
      params: T.shape({
        movieId: T.string,
      }),
    }).isRequired,
  };

  state = {
    reviews: [],
    error: null,
  };

  componentDidMount() {
    const { match } = this.props;

    API.fetchMovieReviews(match.params.movieId)
      .then((res) => this.setState({ reviews: res.data.results }))
      .catch((err) =>
        this.setState({
          error: err.message,
        })
      );
  }

  render() {
    const { reviews, error } = this.state;

    return (
      <div>
        {error && <h2>Ups! Something went wrong... Please try again!</h2>}
        {reviews.length > 0 ? (
          <ul>
            {reviews.map((review) => (
              <li key={review.id}>
                <p>{`Author: ${review.author}`}</p>
                <p>{review.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>We do not have any reviews for this movie. Be the first!</p>
        )}
      </div>
    );
  }
}

export default Reviews;
