import React, { Component } from "react";
import T from "prop-types";
import * as API from "../services/movie_api";

class Cast extends Component {
  static propTypes = {
    match: T.shape({
      params: T.shape({
        movieId: T.string,
      }),
    }).isRequired,
  };

  state = {
    castList: [],
    error: null,
  };

  componentDidMount() {
    const { match } = this.props;

    API.fetchMovieCast(match.params.movieId)
      .then((res) => this.setState({ castList: res.data.cast }))
      .catch((err) =>
        this.setState({
          error: err.message,
        })
      );
  }

  render() {
    const { castList, error } = this.state;

    return (
      <div>
        {error && <h2>Ups! Something went wrong... Please try again!</h2>}
        {castList.length > 0 && (
          <ul>
            {castList.map((el) => (
              <li key={el.id}>
                <img
                  src={`${API.imageURLBaseWidth200}${el.profile_path}`}
                  alt={el.name}
                />
                <p>{el.name}</p>
                <p>{`Character: ${el.character}`}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default Cast;
