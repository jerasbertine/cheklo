import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { list, create, update, remove } from "../controllers/subscriptionsController.js";
import { submitCheckin } from "../controllers/checkinsController.js";

const router = Router();

router.use(requireAuth);

router.get("/", list);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", remove);

router.post("/:id/checkins", submitCheckin);

export default router;