import { Router } from 'express';
import { ProductController } from './product.controller';

const ProductRouter: Router = Router();

ProductRouter.post('/create', ProductController.createProduct);

ProductRouter.get('/', ProductController.getProducts);

ProductRouter.get('/:id', ProductController.getSingleProduct);

ProductRouter.put('/:id', ProductController.updatingProduct);

ProductRouter.delete('/:id', ProductController.deleteProduct);

export default ProductRouter;
