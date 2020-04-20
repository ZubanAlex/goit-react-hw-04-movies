import { lazy } from "react";

const AsyncHomePage = lazy(() =>
  import("../pages/HomePage" /* webpackChunkName: "home-page" */)
);

const AsyncMoviesPage = lazy(() =>
  import("../pages/MoviesPage" /* webpackChunkName: "movie-page" */)
);

const AsyncMovieDetailsPage = lazy(() =>
  import(
    "../pages/MovieDetailsPage" /* webpackChunkName: "movie-details-page" */
  )
);

const AsyncCast = lazy(() =>
  import("../pages/Cast" /* webpackChunkName: "cast-page" */)
);

const AsyncRewiews = lazy(() =>
  import("../pages/Reviews" /* webpackChunkName: "reviews-page" */)
);

export default {
  HOME_PAGE: {
    path: "/",
    component: AsyncHomePage,
  },
  MOVIES_PAGE: {
    path: "/movies",
    component: AsyncMoviesPage,
  },
  MOVIES_DETAILS_PAGE: {
    path: "/movies/:movieId",
    component: AsyncMovieDetailsPage,
  },
  CAST_PAGE: {
    path: "/movies/:movieId/cast",
    component: AsyncCast,
  },
  REVIEWS_PAGE: {
    path: "/movies/:movieId/reviews",
    component: AsyncRewiews,
  },
};
