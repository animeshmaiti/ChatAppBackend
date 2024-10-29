import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getAllUsers,getUsersForSidebar } from "../controllers/userController.js";

const router = express.Router();

router.get("/", protectRoute,getAllUsers);
router.get("/conversations", protectRoute,getUsersForSidebar);

export default router;