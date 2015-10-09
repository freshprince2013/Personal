/**
 * Developer: Satish Sekar
 * Manage a Movie Collection database
 * Client: Central One
 */

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
        Meteor.call("initFilters");
        Meteor.call("initGenres");
        Meteor.call("initMovies");
    });

    Meteor.methods({
        initFilters: function () {
            if (Filters.find().count() == 0) {
                var filters = [
                    {filter: {title: "Movie Title", name: "title", type: "text"}},
                    {filter: {title: "Release Year", name: "year", type: "text"}},
                    {filter: {title: "Genre", name: "genre", type: "select"}}
                ];

                for (var i = 0; i < filters.length; i++) {
                    Filters.insert(filters[i]);
                }
            }
        },
        initGenres: function () {
            if (Genres.find().count() == 0) {
                var genres = [
                    {genre: {value: "Genre", text: "Genre"}},
                    {genre: {value: "Action", text: "Action"}},
                    {genre: {value: "SciFi", text: "SciFi"}},
                    {genre: {value: "Adventure", text: "Adventure"}},
                    {genre: {value: "Drama", text: "Drama"}},
                    {genre: {value: "Foreign", text: "Foreign"}},
                    {genre: {value: "Comedy", text: "Comedy"}},
                    {genre: {value: "Thriller", text: "Thriller"}},
                    {genre: {value: "Romantic", text: "Romantic"}},
                    {genre: {value: "Horror", text: "Horror"}}
                ];

                for (var i = 0; i < genres.length; i++) {
                    Genres.insert(genres[i]);
                }
            }
        },
        initMovies: function () {
            if (Movies.find().count() == 0) {
                var movies = [
                    {movie: {title: "Amelie", year: "1995", genre: "Foreign"}},
                    {movie: {title: "Batman Begins", year: "2011", genre: "Action"}},
                    {movie: {title: "Dumb and Dumber", year: "1993", genre: "Comedy"}}
                ];

                for (var i = 0; i < movies.length; i++) {
                    Movies.insert(movies[i]);
                }
            }
        },
        addMovie: function (mov) {
            Movies.insert(mov);
        },
        updateMovie: function (id, mov) {
            Movies.update({_id:id},{$set:mov});
        },
        deleteMovie: function(id) {
            Movies.remove({_id:id});
        }
    });
}