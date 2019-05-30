import express, { Request, Response, Router } from "express";
const router: Router = express.Router();

/**
 * GET:/logout
 */
router.get("/logout", (req: Request, res: Response) => {
    req.logOut();
    res.redirect("/Home/");
});


export default router;