import { Document } from "mongoose";


// Bike interface
export interface IBike {
    name: string;
    brand: string;
    price: number;
    category: "Mountain" | "Road" | "Hybrid" | "Electric",
    description: string,
    quantity: number,
    inStock: boolean,
};


// combined type with objectId
export type TProduct = IBike & Document;