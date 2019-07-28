import express from "express";
import mongoose from "mongoose";
import http from "http";
import bodyParser from "body-parser";
import session from "express-session";
import { ExpressOIDC } from '@okta/oidc-middleware';
import fileUpload from "express-fileupload";
import useragent from 'express-useragent';

//controllers
import homeController from "./controllers/HomeController";
import accountController from "./controllers/AccountController";

import { authentication } from "./middleware/authentication";
import { loginProcess } from "./middleware/loginProcess";

import "./helpers/vash/helpers";
import { config } from "./config";

const router: express.Router = express.Router();

export function startup(server: http.Server) {

    //setup database connection
    mongoose.connect(config.database.dbUrl, { useNewUrlParser: true });

    //middleware
    router.use(useragent.express());
    router.use(bodyParser.urlencoded({ extended: false }));
    router.use(bodyParser.json());
    router.use(fileUpload({ safeFileNames: true, preserveExtension: true }));

    //Session
    router.use(session({
        secret: config.session.secret,
        resave: true,
        saveUninitialized: false
    }));

    //express configuration
    const oidc = new ExpressOIDC({
        issuer: config.okta.issuer,
        appBaseUrl: `${config.server.transport}://${config.server.domain}:${config.server.port}`,
        client_id: config.okta.client_id,
        client_secret: config.okta.client_secret,
        scope: 'openid profile groups',

        routes: {
            login: {
                path: '/account/login'
              },
            loginCallback: {
                handler: loginProcess
            }
        }
    });

    // ExpressOIDC will attach handlers for the /login and /authorization-code/callback routes
    router.use(oidc.router);
    router.use(authentication);

    //web page controllers
    router.use("/Home", homeController);
    router.use("/Account", accountController);

    //redirect to a known route for the home controller
    router.get("/", (req: express.Request, res: express.Response) => {
        res.redirect("/Home/");
    });

    //respond with a 404 request if the document was not found
    router.use((req: express.Request, res: express.Response) => {
        res.status(404);
        res.render("Shared/404", {url: `${config.server.transport}://${config.server.domain}:${config.server.port}${req.url}`});
    });

    return router;
}
