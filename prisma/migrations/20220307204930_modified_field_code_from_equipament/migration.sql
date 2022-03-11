/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `equipament` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "equipament_code_key" ON "equipament"("code");
