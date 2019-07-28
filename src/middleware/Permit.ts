import { Response, Request, NextFunction } from "express";
import { GeneralUtils } from "../helpers/GeneralUtils";
/**
 * middleware for doing role-based permissions
 * @param allowed allowed roles
 * @param redirect redirect route if role is not permitted. default is the home index of the site
 */
export function permit(allowed: string[] = null, redirect: string = "/") {

    return (req: any, res: Response, next: NextFunction) => {

        if (GeneralUtils.IsLocalhost()) {
            return next()
        }

        //just enforce login
        if (!allowed) {
            if (req.userContext) {
                return next();
            } else {
                return res.redirect(redirect);
            }
        }

        //enforce roles
        let result: string[] = res.locals.authentication.role.filter((role: string) => allowed.includes(role));

        if (result.length > 0)
            return next();
        else
            return res.redirect(redirect);
    };
}

