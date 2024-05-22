-- DropForeignKey
ALTER TABLE "PlanMeals" DROP CONSTRAINT "PlanMeals_mealId_fkey";

-- AddForeignKey
ALTER TABLE "PlanMeals" ADD CONSTRAINT "PlanMeals_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
