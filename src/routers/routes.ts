import express from "express";

import  {Login,newPurchaseEntry,SignUp,getAllNewPurchaseItems, repairingItemEntry, getAllRepairingItems} from "../controllers/controller";


const router = express.Router();

router.post("/login",Login);
router.post("/signup",SignUp);
router.post("/new-purchase",newPurchaseEntry);
router.get("/getAllPurchaseItems",getAllNewPurchaseItems)
router.post('/repairing-item',repairingItemEntry)
router.get('/getAllRepairingItems',getAllRepairingItems)

export default router;