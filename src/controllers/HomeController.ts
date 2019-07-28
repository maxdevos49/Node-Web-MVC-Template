import express, { Request, Response, Router } from "express";
const router: Router = express.Router();
import { View } from "../helpers/vash/view";


/**
 * GET:/index
 */
router.get("/index", (req: Request, res: Response) => {
    res.render("Home/index", View(res));
});

/**
 * GET:/index
 */
router.get("/", (req: Request, res: Response) => {
    res.render("Home/index", View(res));
});

/**
 * GET:/about
 */
router.get("/about", (req: Request, res: Response) => {
    res.render("Home/about", View(res));
});


export default router;
