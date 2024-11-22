import { Router } from "express";
import { ProductController } from "./product.controller";


const router: Router = Router();

router.post("/", ProductController.createProduct);

router.get("/", ProductController.getProducts);

router.get("/:id", ProductController.getSingleProduct);

router.put("/:id", ProductController.updatingProduct);

router.delete("/:id", ProductController.deleteProduct);

