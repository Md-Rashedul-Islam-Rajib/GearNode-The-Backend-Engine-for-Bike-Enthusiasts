import { Document } from 'mongoose';
import { z } from 'zod';
import { ProductZodSchema, UpdateProductZodSchema } from './product.zodSchema';

// Bike interface
export type TBike = z.infer<typeof ProductZodSchema>;
export type TUpdateBike = z.infer<typeof UpdateProductZodSchema>
// combined type with objectId
export type TProduct = TBike & Document;
