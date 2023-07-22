// File Name: movie.ts
// Student Name: Chesta Patel
// Student ID: 200542446
// Date: 21st June 2023

import { Request, Response, NextFunction } from "express";

import Movie from "../Models/movie";

/**
 * Removes empty spaces from string array
 */
function SanitizeArray(unsunatizedArray: String[]) {
    let sanitizedArray: string[] = Array<string>();
    for (const unsunatizedString of unsunatizedArray) {
        sanitizedArray.push(unsunatizedString.trim());
    }
    return sanitizedArray;
}

/**
 * Fucntion get list of movies
 */
export function DisplayMovieList(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    Movie.find({})
        .then(function (data) {
            res.json(data);
        })
        .catch(function (err) {
            console.error(err);
        });
}

/**
 * Fucntion get Movie By ID
 */
export function DisplayMovieByID(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    // Getting the id from url params
    let id = req.params.id;

    // finding movie by passed id
    Movie.findById({ _id: id })
        .then(function (data) {
            res.status(200).json(data);
        })
        .catch(function (err) {
            console.error(err);
        });
}

/**
 * Function to handle adding movie in database
 */
export function AddMovie(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    // Spliting the data by comma and removing white spaces
    let genres = SanitizeArray((req.body.genres as string).split(","));
    let directors = SanitizeArray((req.body.directors as string).split(","));
    let actors = SanitizeArray((req.body.actors as string).split(","));
    let writers = SanitizeArray((req.body.writers as string).split(","));

    // Creating new object of movie
    let movie = new Movie({
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

    // Adding movie in database
    Movie.create(movie)
        .then(function (data) {
            res.status(200).json(movie);
        })
        .catch(function (err) {
            console.error(err);
        });
}

/**
 * Function to handle updating movie in database
 */
export function UpdateMovie(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    // Getting the id from url params
    let id = req.params.id;

    // Spliting the data by comma and removing white spaces
    let genres = SanitizeArray((req.body.genres as string).split(","));
    let directors = SanitizeArray((req.body.directors as string).split(","));
    let actors = SanitizeArray((req.body.actors as string).split(","));
    let writers = SanitizeArray((req.body.writers as string).split(","));

    // Creating new object of movie
    let movieToUpdate = new Movie({
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

    // Updating the movie with id
    Movie.updateOne({ _id: id }, movieToUpdate)
        .then(function (data) {
            res.status(200).json(movieToUpdate);
        })
        .catch(function (err) {
            console.error(err);
        });
}

/**
 * Function to handle deleting movie in database
 */
export function DeleteMovie(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    // Getting the id from url params
    let id = req.params.id;

    // Deleting movie with id from database
    Movie.deleteOne({ _id: id })
        .then(function (data) {
            res.status(200).json(id);
        })
        .catch(function (err) {
            console.error(err);
        });
}
