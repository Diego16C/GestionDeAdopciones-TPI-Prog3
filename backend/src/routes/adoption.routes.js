import { Router } from "express";
import {requestAdoption, approveAdoption, rejectAdoption, getPendingRequests, getAllUserAdoptionRequests} from "../services/adoption.services.js";

const router = Router();

router.post("/adoptions", requestAdoption);
router.get("/adoptions", getAllUserAdoptionRequests);

router.put("/adoptions/:id/approve", approveAdoption);
router.put("/adoptions/:id/reject", rejectAdoption);

router.get("/adoptions/pending", getPendingRequests);

export default router