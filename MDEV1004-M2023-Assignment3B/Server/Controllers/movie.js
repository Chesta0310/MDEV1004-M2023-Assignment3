"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteMovie = exports.UpdateMovie = exports.AddMovie = exports.DisplayMovieByID = exports.DisplayMovieList = void 0;
const movie_1 = __importDefault(require("../Models/movie"));
function SanitizeArray(unsunatizedArray) {
    let sanitizedArray = Array();
    for (const unsunatizedString of unsunatizedArray) {
        sanitizedArray.push(unsunatizedString.trim());
    }
    return sanitizedArray;
}
function DisplayMovieList(req, res, next) {
    movie_1.default.find({})
        .then(function (data) {
        res.json(data);
    })
        .catch(function (err) {
        console.error(err);
    });
}
exports.DisplayMovieList = DisplayMovieList;
function DisplayMovieByID(req, res, next) {
    let id = req.params.id;
    movie_1.default.findById({ _id: id })
        .then(function (data) {
        res.status(200).json(data);
    })
        .catch(function (err) {
        console.error(err);
    });
}
exports.DisplayMovieByID = DisplayMovieByID;
function AddMovie(req, res, next) {
    let genres = SanitizeArray(req.body.genres.split(","));
    let directors = SanitizeArray(req.body.directors.split(","));
    let actors = SanitizeArray(req.body.actors.split(","));
    let writers = SanitizeArray(req.body.writers.split(","));
    let movie = new movie_1.default({
        movieID: req.body.movieID,
        title: req.body.title,
        studio: req.body.studio,
        directors: directors,
        writers: writers,
        genres: genres,
        actors: actors,
        length: req.body.length,
        year: req.body.year,
        shortDescription: req.body.shortDescription,
        mpaRating: req.body.mpaRating,
        criticsRating: req.body.criticsRating,
        posterLink: req.body.posterLink,
    });
    movie_1.default.create(movie)
        .then(function (data) {
        res.status(200).json(movie);
    })
        .catch(function (err) {
        console.error(err);
    });
}
exports.AddMovie = AddMovie;
function UpdateMovie(req, res, next) {
    let id = req.params.id;
    let genres = SanitizeArray(req.body.genres.split(","));
    let directors = SanitizeArray(req.body.directors.split(","));
    let actors = SanitizeArray(req.body.actors.split(","));
    let writers = SanitizeArray(req.body.writers.split(","));
    let movieToUpdate = new movie_1.default({
        _id: id,
        movieID: req.body.movieID,
        title: req.body.title,
        studio: req.body.studio,
        directors: directors,
        writers: writers,
        genres: genres,
        actors: actors,
        length: req.body.length,
        year: req.body.year,
        shortDescription: req.body.shortDescription,
        mpaRating: req.body.mpaRating,
        criticsRating: req.body.criticsRating,
        posterLink: req.body.posterLink,
    });
    movie_1.default.updateOne({ _id: id }, movieToUpdate)
        .then(function (data) {
        res.status(200).json(movieToUpdate);
    })
        .catch(function (err) {
        console.error(err);
    });
}
exports.UpdateMovie = UpdateMovie;
function DeleteMovie(req, res, next) {
    let id = req.params.id;
    movie_1.default.deleteOne({ _id: id })
        .then(function (data) {
        res.status(200).json(id);
    })
        .catch(function (err) {
        console.error(err);
    });
}
exports.DeleteMovie = DeleteMovie;
//# sourceMappingURL=movie.js.map