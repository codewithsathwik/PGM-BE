import { Router } from "express";
import register from "../controllers/auth.controllers.js";

import { userRegisterValidator } from "../validators/index.js";
import { validate } from "../middlewares/validator.middleware.js";

const router = Router();

router.route("/register").post(userRegisterValidator(),validate,register);

export default router;