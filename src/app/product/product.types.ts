import { Document } from 'mongoose';
import { z } from 'zod';
import { ProductZodSchema } from './product.zodSchema';

// Bike interface
export type TBike = z.infer<typeof ProductZodSchema>;

// combined type with objectId
export type TProduct = TBike & Document;
