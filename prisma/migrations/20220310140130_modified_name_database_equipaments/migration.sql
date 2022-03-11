/*
  Warnings:

  - You are about to drop the `equipament` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "equipament" DROP CONSTRAINT "equipament_fk_id_plan_fkey";

-- DropForeignKey
ALTER TABLE "user_equipament" DROP CONSTRAINT "user_equipament_fk_id_equipament_fkey";

-- DropTable
DROP TABLE "equipament";

-- CreateTable
CREATE TABLE "equipment" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "firmware_version" TEXT NOT NULL,
    "hardware_version" TEXT NOT NULL,
    "unusable" BOOLEAN NOT NULL,
    "activated_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "fk_id_plan" TEXT,

    CONSTRAINT "equipment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "equipment_code_key" ON "equipment"("code");

-- AddForeignKey
ALTER TABLE "equipment" ADD CONSTRAINT "equipment_fk_id_plan_fkey" FOREIGN KEY ("fk_id_plan") REFERENCES "plano"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_equipament" ADD CONSTRAINT "user_equipament_fk_id_equipament_fkey" FOREIGN KEY ("fk_id_equipament") REFERENCES "equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
