import { Response, NextFunction } from "express";
import { GeneralUtils } from "../helpers/GeneralUtils";

export function authentication(req: any, res: Response, next: NextFunction) {

    if (!GeneralUtils.IsLocalhost()) {

        if (!req.userContext) {

            res.locals = {
                authentication: {
                    role: ["public"]
                },
                validation: []
            };
            return next();
        }

        let user = req.userContext.userinfo;

        res.locals = {
            authentication: {
                id: user.sub,
                given_name: user.given_name,
                family_name: user.family_name,
                role: user.groups.map((role: string) => role.toLowerCase()),
                username: user.preferred_username
            },
            validation: []
        };

    } else {

        res.locals = {
            authentication: {
                id: 123412341234,
                given_name: "Local",
                family_name: "Host",
                role: ["localhost"],
                username: "localHost"
            },
            validation: []
        };
    }

    next();
}
