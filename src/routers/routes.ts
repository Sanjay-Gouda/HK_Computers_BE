import express from "express";

import {
newPurchaseEntry,
  getAllNewPurchaseItems,
  updatePurchaseEntry,
  findPurchaseEntryById,
} from "../controllers/new-purchase-controller";

import {
  repairingItemEntry,
  getAllRepairingItems,
  updateRepairingEntry,
  findRepairingEntryById,
} from "../controllers/repairing-controller";

import {
CheckSiteHealth,
Login,
Logout,
SignUp,

} from '../controllers/auth-controller'

import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/login", Login);
router.post("/logout", Logout);
router.post("/signup", SignUp);
router.post("/create/new-purchase", authMiddleware, newPurchaseEntry);
router.put("/update/new-purchase/:id", authMiddleware, updatePurchaseEntry);
router.get("/view/new-purchase/:id", authMiddleware, findPurchaseEntryById);
router.get("/getAllPurchaseItems", authMiddleware, getAllNewPurchaseItems);
router.post("/create/repairing-item", authMiddleware, repairingItemEntry);
router.put("/update/repairing-item/:id", authMiddleware, updateRepairingEntry);
router.get("/view/repairing-item/:id", authMiddleware, findRepairingEntryById);
router.get("/getAllRepairingItems", authMiddleware, getAllRepairingItems);
router.get("/health", CheckSiteHealth);

export default router;
