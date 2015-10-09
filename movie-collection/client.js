/**
 * Developer: Satish Sekar
 * Manage a Movie Collection database
 * Client: Central One
 */

Filters = new Meteor.Collection("filters");
Genres = new Meteor.Collection("genres");
Movies = new Meteor.Collection("movies");

if (Meteor.isClient) {
  Template.header.helpers({
    shareFacebook: function() {
      return 'https://www.facebook.com/sharer/sharer.php?&u=' + window.location.href;
    },
    shareTwitter: function() {
      return 'https://twitter.com/intent/tweet?url=' + window.location.href + '&text=' + document.title;
    },
    shareGPlus: function() {
      return 'https://plus.google.com/share?url=' + window.location.href;
    }
  });

  Template.record.helpers({
    isMovieInputText: function (data) {
      return (data === "text") ? true : false;
    },
    filters: function () {
      return Filters.find();
    },
    genres: function () {
      return Genres.find();
    }
  });

  Template.table.helpers({
    movies: function () {
      if (Session.get("sortOrder")) {
        if (Session.get("sortOrder").order === -1) {
          if (Session.get("sortOrder").key === "title") {
            return Movies.find({}, {sort: {"movie.title": -1}});
          } else if (Session.get("sortOrder").key === "year") {
            return Movies.find({}, {sort: {"movie.year": -1}});
          } else {
            return Movies.find({}, {sort: {"movie.genre": -1}});
          }
        } else if (Session.get("sortOrder").order === 1) {
          if (Session.get("sortOrder").key === "title") {
            return Movies.find({}, {sort: {"movie.title": 1}});
          } else if (Session.get("sortOrder").key === "year") {
            return Movies.find({}, {sort: {"movie.year": 1}});
          } else {
            return Movies.find({}, {sort: {"movie.genre": 1}});
          }
        } else {
          return Movies.find();
        }
      } else {
        return Movies.find();
      }
    }
  });

  Template.record.events({
    'click .addupdate': function (e1) {
      e1.preventDefault();

      var action = "add",
          id = "";

      if ( isValidate() ) {
        Movies.find().forEach(function(item) {
          if ( item.movie.title == getMovie().movie.title ) {
            action = "update";
            id = item._id;
          }
        });

        ( action === "update" ) ? Meteor.call("updateMovie", id, getMovie()) : Meteor.call("addMovie", getMovie());
      }
    }
  });

  Template.table.events({
    'click .edit' : function (e2) {
      e2.preventDefault();
      editForm(e2.currentTarget);
    }
  });

  Template.table.events({
    'click .delete' : function (e3) {
      e3.preventDefault();
      Meteor.call("deleteMovie", this._id);
    }
  });

  Template.table.events({
    'click .header div' : function (e4) {
      e4.preventDefault();

      if ( !Session.get("sortOrder") ) {
        Session.set("sortOrder", {key:$(e4.currentTarget).attr("class"),order:-1});
      } else {
        if ( Session.get("sortOrder").order === -1 ) {
          Session.set("sortOrder", {key:$(e4.currentTarget).attr("class"),order:1});
        } else {
          Session.set("sortOrder", {key:$(e4.currentTarget).attr("class"),order:-1});
        }
      }
    }
  });

  var getMovie = function () {
    var obj = { movie: { title: $("div.title input").val(), year: $("div.year input").val(), genre: $("div.genre select option:selected").val() } };
    return obj;
  };

  var editForm = function (me) {
    var obj = {
                  movie: {
                    title: $(me).parent().parent().find("div:first-child").html(),
                    year: $(me).parent().parent().find("div:first-child + div").html(),
                    genre: $(me).parent().parent().find("div:first-child + div + div").html()
                  }
                };

    $("div.title input").val(obj.movie.title);
    $("div.year input").val(obj.movie.year);
    $("div.genre select option").filter( function() {
      return $.trim($(this).text()) == $.trim(obj.movie.genre);
    }).prop("selected", true);
  };

  var isValidate = function () {
    var flag = false;
    if (( $("div.title input").val() === "" ) || ( $("div.year input").val() === "" ) || ( $("div.genre select option:selected").val() === "Genre" )) {
      $("div#top > div > div input").each(function (i) {
        if ($(this).val() === "") {
          (!$(this).parent().hasClass("error")) ? $(this).parent().addClass("error") : $(this).parent().removeClass("error").addClass("error");
          $(this).focus();
        } else {
          $(this).parent().removeClass("error");
          $(this).blur();
        }
      });

      $("div#top > div > div select").each(function (i) {
        if ($(this).find("option:selected").val() === "Genre") {
          (!$(this).hasClass("error")) ? $(this).addClass("error") : $(this).removeClass("error").addClass("error");
          $(this).focus();
        } else {
          $(this).removeClass("error");
          $(this).blur();
        }
      });
    } else {
      $("div#top > div > div, div#top > div > div select").removeClass("error");

      $("div#top > div > div input").each(function (i) {
        if ( $(this).parent().hasClass("year") ) {
          if ( isNaN( $(this).val() ) ) {
            (!$(this).parent().hasClass("error")) ? $(this).parent().addClass("error") : $(this).parent().removeClass("error").addClass("error");
            $(this).focus();
          } else {
            if ( ( $(this).val() >= 1600 ) && ( $(this).val() <= 2015 ) ) {
              $("div#top > div > div, div#top > div > div select").removeClass("error");
              flag = true;
            } else {
              (!$(this).parent().hasClass("error")) ? $(this).parent().addClass("error") : $(this).parent().removeClass("error").addClass("error");
              $(this).focus();
            }
          }
        }
      });
    }

    return flag;
  }
}