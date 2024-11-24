# [GearNode (The-Backend-Engine-for-Bike-Enthusiasts)](https://gearnode.vercel.app) 🏍

The GearNode API is a robust backend solution designed to manage products (bikes) and orders in a bike store. Built with **Express.js**, **TypeScript** and **MongoDB** with **Mongoose ODM**, it ensures data integrity with Mongoose schema validation and includes features like product CRUD operations, inventory management, and revenue calculation.

---

## Features

### 🚴 Product (Bike) Management

-   Create, read, update, and delete products.
-   Search for products by name, brand, or type.
-   Supports categories such as Mountain, Road, Hybrid, Hybrid and Electric.

### 📦 Order Management

-   Place orders with customer `email` and product (bike) `id`.
-   Automatically adjust stock quantities and availability based on orders.
-   Prevent orders if stock is insufficient.

### 📊 Revenue Insights

-   Calculate total revenue from all orders using MongoDB aggregation.

### ⚙️ Error Handling

-   Unified error responses for `validation` (mostly `zod` and `MongoDB`), `casting` (MongoDB `ObjectId`), and `parsing`, `insufficient`, `not found` and almost every possible types of errors.
-   Clear and structured error messages to facilitate debugging.

---

## Run the Server Locally

### Prerequisites

-   Node.js (v22+)
-   pnpm package manager
-   if you prefer `npm` or `yarn`, delete `pnpm-lock.yaml` file and follow the following steps

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Md-Rashedul-Islam-Rajib/GearNode-The-Backend-Engine-for-Bike-Enthusiasts
    cd GearNode-The-Backend-Engine-for-Bike-Enthusiasts
    ```

2. Install dependencies:

    ```bash
    pnpm install
    ```

    for `npm`:

    ```bash
    npm install
    ```

    for `yarn`:

    ```bash
    yarn install
    ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following fields:

    ```env
    PORT=4242
    MONGODB_URI=your_mongo_db_uri
    ```

4. Start the server:

    ```bash
    pnpm start
    ```

    for `npm`:

    ```bash
    npm start
    ```

    for `yarn`:

    ```bash
    yarn start
    ```

5. Access the API at:

    ```bash
    http://localhost:4242
    ```

---

## API Documentation

### Base URL

`http://localhost:4242`

### Endpoints

#### **Products (Bike)**

1. **Create a Product**

    - **POST** `/api/products`
    - Request body:

        ```json
        {
            "name": "Trailblazer X500",
            "brand": "MountainGear",
            "price": 1200,
            "category": "Mountain",
            "description": "A rugged mountain bike built for extreme terrains.",
            "quantity": 10,
            "inStock": true
        }
        ```

    - Response:

        ```json
        {
               "_id": "674095031a40ca9e7e9552cd",
               "name": "Trailblazer X500",
               "brand": "MountainGear",
               "price": 1200,
               "category": "Mountain",
               "description": "A rugged mountain bike built for extreme terrains.",
               "quantity": 10,
               "inStock": true,
               "createdAt": "2024-11-22T14:28:19.332Z",
               "updatedAt": "2024-11-23T20:25:10.217Z"
           },
        ```

2. **Get All Bicycles**

    - **GET** `/api/products`
    - Query parameters: `searchTerm`
    - Query endpoint : `/api/products?searchTerm=fieldValue`
    - Response:

        ```json
        {
          "message": "Bicycles retrieved successfully!",
          "status": true,
          "data": [
           {
               "_id": "674094f91a40ca9e7e9552cb",
               "name": "To Yo Ta",
               "brand": "CityCycles",
               "price": 1000,
               "category": "Hybrid",
               "description": "Perfect mix of road and off-road capabilities.",
               "quantity": 6,
               "inStock": true,
               "createdAt": "2024-11-22T14:28:09.887Z",
               "updatedAt": "2024-11-24T10:58:13.866Z"
           },
           {
               "_id": "674095031a40ca9e7e9552cd",
               "name": "Roadster Pro",
               "brand": "SpeedyCycles",
               "price": 900,
               "category": "Road",
               "description": "Lightweight road bike for high-speed enthusiasts.",
               "quantity": 0,
               "inStock": false,
               "createdAt": "2024-11-22T14:28:19.332Z",
               "updatedAt": "2024-11-23T20:25:10.217Z"
           },
           {...}
           ]
        }
        ```

3. **Get a Specific Bicycle**

    - **GET** `/api/products/:productId`

4. **Update a Bicycle**

    - **PUT** `/api/products/:productId`
    - Request body contains fields to update.

5. **Delete a Bicycle**
    - **DELETE** `/api/products/:productId`

#### **Orders**

1. **Place an Order**

    - **POST** `/api/orders`
    - Request body:

        ```json
        {
            "email": "customer@example.com",
            "product": "productId",
            "quantity": 2,
            "totalPrice": 600
        }
        ```

    Note : `totalPrice` is optional, if not provided, the application will calculate total price from the product (Bike) collection

2. **Get Revenue**

    - **GET** `/api/orders/revenue`
    - Response:

        ```json
        {
            "message": "Revenue calculated successfully!",
            "status": true,
            "data": { "totalRevenue": 1200 }
        }
        ```

---

## Error Responses

All error responses follow this structured format:

```json
{
    "message": "ErrorMessage",
    "success": false,
    "error": {
        "name": "ErrorName",
        "errors": "ErrorObject"
    },
    "stack": "StackLocation"
}
```
