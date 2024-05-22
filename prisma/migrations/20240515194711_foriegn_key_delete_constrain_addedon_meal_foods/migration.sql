-- DropForeignKey
ALTER TABLE "MealFoods" DROP CONSTRAINT "MealFoods_mealId_fkey";

-- AddForeignKey
ALTER TABLE "MealFoods" ADD CONSTRAINT "MealFoods_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
