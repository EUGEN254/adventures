import express from "express";
import upload from "../middleware/multer.js";
import { addfeature, getFeatures, addHotel,getHotels } from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.post("/add-feature", upload.single("img"), addfeature);
adminRouter.get("/get-features", getFeatures);
adminRouter.post("/add-hotels", upload.array("images", 4), addHotel);
adminRouter.get("/get-hotels", getHotels);

export default adminRouter;
