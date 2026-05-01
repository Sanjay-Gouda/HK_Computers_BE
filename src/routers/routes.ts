import express from "express";

import  {Login,newPurchaseEntry,SignUp,getAllNewPurchaseItems} from "../controllers/controller";


const router = express.Router();

router.post("/login",Login);
router.post("/signup",SignUp);
router.post("/new-purchase",newPurchaseEntry);
router.get("/getAllPurchaseItems",getAllNewPurchaseItems)

export default router;