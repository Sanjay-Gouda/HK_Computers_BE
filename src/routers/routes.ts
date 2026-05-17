import express from "express";

import {
  Login,
  newPurchaseEntry,
  SignUp,
  getAllNewPurchaseItems,
  repairingItemEntry,
  getAllRepairingItems,
  CheckSiteHealth,
  updatePurchaseEntry,
  findPurchaseEntryById,
} from "../controllers/controller";

const router = express.Router();

router.post("/login", Login);
router.post("/signup", SignUp);
router.post("/create/new-purchase", newPurchaseEntry);
router.put("/update/new-purchase/:id", updatePurchaseEntry);
router.get("/view/new-purchase/:id", findPurchaseEntryById);
router.get("/getAllPurchaseItems", getAllNewPurchaseItems);
router.post("/create/repairing-item", repairingItemEntry);
router.get("/getAllRepairingItems", getAllRepairingItems);
router.get("/health", CheckSiteHealth);

export default router;
