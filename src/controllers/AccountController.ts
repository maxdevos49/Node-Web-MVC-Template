import express, { Request, Response, Router } from "express";
import { permit } from "../middleware/permit";
import userModel from "../Models/userModel";
import { View } from "../helpers/vash/view";
import { UserViewModel } from "../viewModels/DashboardViewModel";
const router: Router = express.Router();

/**
 * GET:/logout
 */
router.get("/logout", (req: Request, res: Response) => {
    req.logOut();
    res.redirect("/Home/");
});

/**
 * GET:/register
 */
router.get("/register", permit(["homecenter-user"]), (req: Request, res: Response) => {

    console.log("Registering....");

    res.redirect("/Home/");
});

/**s
 * GET:/dashboard
 */
router.get("/dashboard", permit(["homecenter-user"]), (req: any, res: Response) => {
    
    userModel.findOne({oktaId: req.userContext.userinfo.sub}, (err, doc) => {
        if(err) throw err;

         res.render("Account/dashboard", View(res, UserViewModel, doc));


    });
});


export default router;