/*
  Warnings:

  - You are about to drop the column `fk_id_plano` on the `equipament` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[fk_id_plan]` on the table `equipament` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fk_id_plan` to the `equipament` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "equipament" DROP CONSTRAINT "equipament_fk_id_plano_fkey";

-- DropIndex
DROP INDEX "equipament_fk_id_plano_key";

-- AlterTable
ALTER TABLE "equipament" DROP COLUMN "fk_id_plano",
ADD COLUMN     "fk_id_plan" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "equipament_fk_id_plan_key" ON "equipament"("fk_id_plan");

-- AddForeignKey
ALTER TABLE "equipament" ADD CONSTRAINT "equipament_fk_id_plan_fkey" FOREIGN KEY ("fk_id_plan") REFERENCES "plano"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
