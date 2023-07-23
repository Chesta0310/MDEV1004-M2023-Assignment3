//
//  Movie.swift
//  MDEV1004-M2023-Assignment3-iOS
//
//  Created by Chesta Patel on 22/07/23.
//

struct Movie: Codable
{
    let movieID: String
    let title: String
    let studio: String
    let genres: [String]
    let directors: [String]
    let writers: [String]
    let actors: [String]
    let year: Int
    let length: Int
    let shortDescription: String
    let mpaRating: String
    let criticsRating: Double
}
