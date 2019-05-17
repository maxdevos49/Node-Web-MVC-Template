import express from "express";
import mongoose from "mongoose";
import http from "http";
// import bodyParser from "body-parser";
// import passport from "passport";
// import session from "express-session";

import homeController from "./controllers/HomeController";
// import authController from "./controllers/AuthController";

// import { localStrat } from "./middleware/passport";
// import { authentication } from "./middleware/authentication";

import "./helpers/vash/helpers";
import { config } from "./config";

const router: express.Router = express.Router();

export function setup(server: http.Server) {

    //setup database connection
    // mongoose.connect(config.database.dbUrl, { useNewUrlParser: true });

    //setup passport and load strategies
    // let sessionMiddleware = session({ secret: config.session.secret, resave: false, saveUninitialized: false });
    // router.use(sessionMiddleware);
    // localStrat(passport);

    // //middleware
    // router.use(bodyParser.urlencoded({ extended: false }));
    // router.use(bodyParser.json());
    // router.use(passport.initialize());
    // router.use(passport.session());
    // router.use(authentication);

    //web page controllers
    router.use("/Home", homeController);
    // router.use("/Auth", authController);

    //redirect to a known route for the home controller
    router.get("/", (req: express.Request, res: express.Response) => {
        res.redirect("/Home/");
    });

    //respond with a 404 request if the document was not found
    router.use((req: express.Request, res: express.Response) => {
        res.status(404);
        res.render("Shared/404");
    });

    return router;
}
