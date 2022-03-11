/*
  Warnings:

  - You are about to drop the `plano` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_equipament` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "equipament" DROP CONSTRAINT "equipament_fk_id_plano_fkey";

-- DropForeignKey
ALTER TABLE "user_equipament" DROP CONSTRAINT "user_equipament_fk_id_equipament_fkey";

-- DropForeignKey
ALTER TABLE "user_equipament" DROP CONSTRAINT "user_equipament_fk_id_role_fkey";

-- DropForeignKey
ALTER TABLE "user_equipament" DROP CONSTRAINT "user_equipament_fk_id_user_fkey";

-- DropTable
DROP TABLE "plano";

-- DropTable
DROP TABLE "role";

-- DropTable
DROP TABLE "user_equipament";
