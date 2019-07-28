import express, { Response, Router } from "express";
import { permit } from "../middleware/permit";
import userModel from "../models/userModel";
import { View } from "../helpers/vash/view";
import { UserViewModel } from "../viewModels/userViewModel";
import { GeneralUtils } from "../helpers/GeneralUtils";
const router: Router = express.Router();

/**
 * GET:/logout
 */
router.get("/logout", (req: any, res: Response) => {
    req.logOut();
    res.redirect("/Home/");
});

/**
 * GET:/dashboard
 */
router.get("/dashboard", permit(), async (req: any, res: Response) => {

    try {
        let user = await userModel.findOne({ oktaId: GeneralUtils.GetLoggedInUserId(res) });

        res.render("Account/dashboard", View(res, UserViewModel, user));
    } catch (err) {
        GeneralUtils.sendErrorNotification(res, err);
    }

});


export default router;