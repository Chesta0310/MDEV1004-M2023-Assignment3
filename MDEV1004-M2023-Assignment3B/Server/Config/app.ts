// File Name: app.ts
// Student Name: Chesta Patel
// Student ID: 200542446
// Date: 22nd July 2023

// express modules
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

// modules for authentication
import session from "express-session";
import passport from "passport";
import passportLocal from "passport-local";

// authentication objects
let strategy = passportLocal.Strategy; // alias
import User from "../Models/user";

// database modules
import mongoose from "mongoose";
import db from "./db";

mongoose.connect(db.remoteURI);

// DB Connection Events
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB`);
});

mongoose.connection.on("disconnected", () => {
    console.log("Disconnected from MongoDB");
});

import indexRouter from "../Routes/index";

let app = express();

// middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../../Client")));

// setup express session
app.use(
    session({
        secret: db.secret,
        saveUninitialized: false,
        resave: false,
    })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// implement an Auth Strategy
passport.use(User.createStrategy());
// serialize and deserialize user data
passport.serializeUser(User.serializeUser() as any);
passport.deserializeUser(User.deserializeUser());

app.use("/api/", indexRouter);

export default app;
