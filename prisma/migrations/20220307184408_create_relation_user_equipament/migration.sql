-- CreateTable
CREATE TABLE "user_equipament" (
    "id" TEXT NOT NULL,
    "fk_id_user" TEXT NOT NULL,
    "fk_id_equipament" TEXT NOT NULL,
    "fk_id_role" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_equipament_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_equipament_fk_id_user_key" ON "user_equipament"("fk_id_user");

-- CreateIndex
CREATE UNIQUE INDEX "user_equipament_fk_id_equipament_key" ON "user_equipament"("fk_id_equipament");

-- CreateIndex
CREATE UNIQUE INDEX "user_equipament_fk_id_role_key" ON "user_equipament"("fk_id_role");

-- AddForeignKey
ALTER TABLE "user_equipament" ADD CONSTRAINT "user_equipament_fk_id_user_fkey" FOREIGN KEY ("fk_id_user") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_equipament" ADD CONSTRAINT "user_equipament_fk_id_equipament_fkey" FOREIGN KEY ("fk_id_equipament") REFERENCES "equipament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
