import { Router } from "express";
import {requestAdoption, approveAdoption, rejectAdoption, getPendingRequests, getAllUserAdoptionRequests} from "../services/adoption.services.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { verifyRole } from "../middlewares/verifyRole.js";

const router = Router();

router.post("/adoptions", verifyToken, verifyRole("client"),requestAdoption);
router.get("/adoptions/user/:userId", verifyToken, verifyRole("client"),getAllUserAdoptionRequests);


router.put("/adoptions/:id/approve",verifyToken, verifyRole("worker", "admin"), approveAdoption);
router.put("/adoptions/:id/reject", verifyToken, verifyRole("worker", "admin"),rejectAdoption);

router.get("/adoptions/pending",verifyToken, verifyRole("worker", "admin"), getPendingRequests);

export default router