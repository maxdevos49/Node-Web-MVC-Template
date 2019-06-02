import express, { Request, Response, Router } from "express";
import { permit } from "../middleware/permit";
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
router.get("/dashboard", permit(["homecenter-user"]), (req: Request, res: Response) => {
    res.render("Account/dashboard");
});


export default router;