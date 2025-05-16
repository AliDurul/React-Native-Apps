import { Router } from "express";
import { createToken, deleteToken, getTokenById, getTokens, updateToken } from "../controllers/token.controller";

const router = Router();

router.route("/").get(getTokens).post(createToken)
router.route('/:id').get(getTokenById).put(updateToken).delete(deleteToken);

export default router;