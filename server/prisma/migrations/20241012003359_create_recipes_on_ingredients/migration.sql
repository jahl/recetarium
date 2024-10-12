-- CreateTable
CREATE TABLE "IngredienstOnRecipes" (
    "id" SERIAL NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,
    "quantity" DECIMAL(65,30) NOT NULL,
    "measuring_unit" TEXT NOT NULL,

    CONSTRAINT "IngredienstOnRecipes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "IngredienstOnRecipes" ADD CONSTRAINT "IngredienstOnRecipes_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredienstOnRecipes" ADD CONSTRAINT "IngredienstOnRecipes_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
