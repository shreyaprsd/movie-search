import "./MovieList.css";
function MovieList(props) {
  const FavouriteComponent = props.favouriteComponent;

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-4">
      
        {props.movies &&
          props.movies.slice(0,4).map((movie) => (
            <div className="row__contains">
              <img
                className="row__image"
                key={movie.imdbID}
                src={movie.Poster}
                alt="title"
              ></img>

              <div
                className="row__overlay"
                onClick={() => props.handleFavouritesClick(movie)}
              >
                <FavouriteComponent />
              </div>
            </div>
          ))}
        ;
      </div>

  );
}

export default MovieList;