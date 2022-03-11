-- DropForeignKey
ALTER TABLE "equipament" DROP CONSTRAINT "equipament_fk_id_plan_fkey";

-- AlterTable
ALTER TABLE "equipament" ALTER COLUMN "deleted_at" DROP NOT NULL,
ALTER COLUMN "fk_id_plan" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "equipament" ADD CONSTRAINT "equipament_fk_id_plan_fkey" FOREIGN KEY ("fk_id_plan") REFERENCES "plano"("id") ON DELETE SET NULL ON UPDATE CASCADE;
