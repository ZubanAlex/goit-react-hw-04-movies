import React from "react";
import { Link } from "react-router-dom";
import T from "prop-types";

const AdditionalInformation = ({ movieId, location }) => (
  <div>
    <Link
      to={{
        pathname: `/movies/${movieId}/cast`,
        state: { from: { ...location } },
      }}
      replace
    >
      Cast
    </Link>
    <br />
    <Link
      to={{
        pathname: `/movies/${movieId}/reviews`,
        state: { from: { ...location } },
      }}
      replace
    >
      Reviews
    </Link>
  </div>
);

AdditionalInformation.propTypes = {
  movieId: T.string.isRequired,
  location: T.shape({
    state: T.shape({
      from: T.shape({}),
    }),
  }).isRequired,
};

export default AdditionalInformation;
