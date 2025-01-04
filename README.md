# Nutrition Planning App - Backend Documentation

## Overview
The backend of the Nutrition Planning App is built using **Node.js** with **Express.js** and uses **Prisma ORM** for database management. It provides a RESTful API for the frontend to interact with, handling user authentication, macro calculations, and meal/plan management. The database is powered by **PostgreSQL**.

---

## Tech Stack
- **Framework**: Node.js with Express.js
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Authentication**: JWT-based authentication
- **Utilities**: Helper functions for tasks like JWT signing/verification

---

## Folder Structure
```
/src
  index.ts          # Entry point for the server
  /routes           # Defines all API endpoints
  /middleware       # Authentication and other middleware
  /controllers      # Handles request/response logic
  /utilities        # Helper functions (e.g., JWT signing, error handling)
```

---

## Database Architecture
The database schema is designed to efficiently manage user data, meal plans, and their associated nutritional information. Below is a detailed explanation of each model:

### **1. User**
Stores user information.
- **Fields**:
  - `id`: Primary key, auto-incremented.
  - `firstname`, `lastname`: User’s first and last names.
  - `email`: Unique email for authentication.
  - `password`: Hashed password.
  - `gender`, `height`, `weight`, `date_of_birth`: Personal details for macro calculations.
  - Relations:
    - **Meal**: One-to-many with the `Meal` model.
    - **Plan**: One-to-many with the `Plan` model.
    - **Goal**: One-to-many with the `Goal` model.

### **2. Goal**
Stores the user’s macro and fitness goals.
- **Fields**:
  - `id`: Primary key, auto-incremented.
  - `userId`: Foreign key linking to `User`.
  - `target_weight`: Target weight in kilograms.
  - `caloric_adjustment`: Daily caloric adjustment (e.g., surplus or deficit).
  - `surplus`: Boolean indicating surplus or deficit.
  - `protein`, `fats`, `carbs`: Custom macro targets.
  - `activity_level`: Activity multiplier for macro calculation.

### **3. Meal**
Stores user-created meals.
- **Fields**:
  - `id`: Primary key, auto-incremented.
  - `name`: Meal name.
  - `userId`: Foreign key linking to `User`.
  - Relations:
    - **MealFoods**: One-to-many with the `MealFoods` model.
    - **PlanMeals**: One-to-many with the `PlanMeals` model.

### **4. MealFoods**
Stores the food items within a meal.
- **Fields**:
  - `id`: Primary key, auto-incremented.
  - `mealId`: Foreign key linking to `Meal`.
  - `foodName`: Name of the food item.
  - `foodId`: ID of the food item from the Edamam API.
  - `quantity`: Quantity of the food item (default: 100 grams).

### **5. Plan**
Stores user-created plans.
- **Fields**:
  - `id`: Primary key, auto-incremented.
  - `name`: Plan name.
  - `userId`: Foreign key linking to `User`.
  - Relations:
    - **PlanMeals**: One-to-many with the `PlanMeals` model.

### **6. PlanMeals**
Stores meals included in a plan.
- **Fields**:
  - `id`: Primary key, auto-incremented.
  - `planId`: Foreign key linking to `Plan`.
  - `mealId`: Foreign key linking to `Meal`.
  - `mealName`: Name of the meal.
  - Relations:
    - **PlanMealFoods**: One-to-many with the `PlanMealFoods` model.

### **7. PlanMealFoods**
Stores food items for a specific plan’s meal.
- **Fields**:
  - `id`: Primary key, auto-incremented.
  - `planMealId`: Foreign key linking to `PlanMeals`.
  - `foodName`, `foodId`: Name and ID of the food item.
  - `quantity`: Quantity of the food item (default: 100 grams).

---

## API Endpoints
### Authentication
- **POST /auth/signup**: Register a new user.
- **POST /auth/login**: Authenticate a user and return a JWT.
- **POST /auth/refresh-token**: Refresh the access token.

### User Goals
- **GET /goal**: Fetch user goals.
- **PUT /goal**: Update user goals.

### Meals
- **GET /meal**: Fetch all meals for a user.
- **POST /meal**: Create a new meal.
- **PUT /meal/:mealId**: Update an existing meal.
- **DELETE /meal/:mealId**: Delete a meal.

### Plans
- **GET /plan**: Fetch all plans for a user.
- **POST /plan**: Create a new plan.
- **PUT /plan/:planId**: Update an existing plan.
- **DELETE /plan/:planId**: Delete a plan.
- **POST /plan/addSingleMeal**: Add a single meal to a plan.
- **GET /plan/:planId/details**: Fetch details of a specific plan.
- **DELETE /plan/deleteMealFromPlan/:entryId**: Delete a meal from a plan.

### Users
- **GET /user**: Fetch user details.
- **PUT /user**: Update user details.

---

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in the root directory with the following variables:
   ```bash
   DATABASE_URL=<your_postgres_db_url>
   JWT_SECRET=<your_jwt_secret>
   ```

3. **Database Migration**
   Use Prisma to set up the database schema.
   ```bash
   npx prisma migrate dev
   ```

4. **Run the Server**
   ```bash
   npm run dev
   ```

5. **Build and Start for Production**
   ```bash
   npm run build
   npm start
   ```

---

## Notes for Developers

1. **Prisma Usage**:
   - Use Prisma Client for database operations.
   - Ensure relations are maintained to avoid orphaned records.

2. **JWT Authentication**:
   - Use middleware to verify JWTs for protected routes.

3. **Edamam API Integration**:
   - Handle API errors gracefully to ensure app reliability.

4. **Cascade Deletions**:
   - Deleting a `Meal` or `Plan` will cascade and remove related records to maintain database integrity.

---

This documentation provides a comprehensive guide to the backend of the Nutrition Planning App. Let me know if additional details or sections are needed!
