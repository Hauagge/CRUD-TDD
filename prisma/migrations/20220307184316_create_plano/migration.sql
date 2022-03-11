-- CreateTable
CREATE TABLE "plano" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "permission" TEXT[],

    CONSTRAINT "plano_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "equipament" ADD CONSTRAINT "equipament_fk_id_plano_fkey" FOREIGN KEY ("fk_id_plano") REFERENCES "plano"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
