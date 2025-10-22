import { Router } from "express";
import { listUsers, createUser, updateUser, deleteUser } from "../services/user.services.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { verifyRole } from "../middlewares/verifyRole.js";

const router = Router();

router.get("/users", verifyToken, verifyRole("admin"), listUsers);
router.post("/user", verifyToken, verifyRole("admin"), createUser);
router.put("/user/:id", verifyToken, verifyRole("admin"), updateUser);
router.delete("/user/:id", verifyToken, verifyRole("admin"), deleteUser);

export default router;