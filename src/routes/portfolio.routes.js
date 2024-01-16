import { Router } from "express";
import {insertPortfolio, getEntry} from "../controllers/portfolio.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/insert-portfolio").post(verifyJWT,insertPortfolio)
router.route("/entry").get(verifyJWT,getEntry)

export default router
