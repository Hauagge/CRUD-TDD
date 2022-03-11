/*
  Warnings:

  - You are about to drop the `permissions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "permissions";

-- CreateTable
CREATE TABLE "permission" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role_permissions" (
    "id" TEXT NOT NULL,
    "fk_id_permission" TEXT NOT NULL,
    "fk_id_role" TEXT NOT NULL,

    CONSTRAINT "role_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "role_permissions_fk_id_permission_key" ON "role_permissions"("fk_id_permission");

-- CreateIndex
CREATE UNIQUE INDEX "role_permissions_fk_id_role_key" ON "role_permissions"("fk_id_role");

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_fk_id_role_fkey" FOREIGN KEY ("fk_id_role") REFERENCES "role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_fk_id_permission_fkey" FOREIGN KEY ("fk_id_permission") REFERENCES "permission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
