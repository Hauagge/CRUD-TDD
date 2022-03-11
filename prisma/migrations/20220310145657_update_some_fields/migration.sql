/*
  Warnings:

  - You are about to drop the column `fk_id_equipament` on the `user_equipament` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[fk_id_equipment]` on the table `user_equipament` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fk_id_equipment` to the `user_equipament` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user_equipament" DROP CONSTRAINT "user_equipament_fk_id_equipament_fkey";

-- DropIndex
DROP INDEX "user_equipament_fk_id_equipament_key";

-- AlterTable
ALTER TABLE "user_equipament" DROP COLUMN "fk_id_equipament",
ADD COLUMN     "fk_id_equipment" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_equipament_fk_id_equipment_key" ON "user_equipament"("fk_id_equipment");

-- AddForeignKey
ALTER TABLE "user_equipament" ADD CONSTRAINT "user_equipament_fk_id_equipment_fkey" FOREIGN KEY ("fk_id_equipment") REFERENCES "equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
