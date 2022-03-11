-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatar" TEXT,
    "code_post" TEXT,
    "country" TEXT,
    "state" TEXT,
    "city" TEXT,
    "district" TEXT,
    "street" TEXT,
    "number" TEXT,
    "complement" TEXT,
    "document_type" TEXT,
    "document_number" TEXT,
    "userType" TEXT,
    "privice_police" BOOLEAN NOT NULL DEFAULT false,
    "terms_user" BOOLEAN NOT NULL DEFAULT false,
    "email_confirmed" BOOLEAN NOT NULL DEFAULT false,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "equipament" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "firmware_version" TEXT NOT NULL,
    "hardware_version" TEXT NOT NULL,
    "unusable" BOOLEAN NOT NULL,
    "activateDate" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3) NOT NULL,
    "fk_id_plano" TEXT NOT NULL,

    CONSTRAINT "equipament_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plano" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "permission" TEXT[],

    CONSTRAINT "plano_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "role" (
    "id" TEXT NOT NULL,
    "role_name" TEXT NOT NULL,
    "hierarchy_position" TEXT NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "equipament_fk_id_plano_key" ON "equipament"("fk_id_plano");

-- CreateIndex
CREATE UNIQUE INDEX "user_equipament_fk_id_user_key" ON "user_equipament"("fk_id_user");

-- CreateIndex
CREATE UNIQUE INDEX "user_equipament_fk_id_equipament_key" ON "user_equipament"("fk_id_equipament");

-- CreateIndex
CREATE UNIQUE INDEX "user_equipament_fk_id_role_key" ON "user_equipament"("fk_id_role");

-- AddForeignKey
ALTER TABLE "equipament" ADD CONSTRAINT "equipament_fk_id_plano_fkey" FOREIGN KEY ("fk_id_plano") REFERENCES "plano"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_equipament" ADD CONSTRAINT "user_equipament_fk_id_user_fkey" FOREIGN KEY ("fk_id_user") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_equipament" ADD CONSTRAINT "user_equipament_fk_id_equipament_fkey" FOREIGN KEY ("fk_id_equipament") REFERENCES "equipament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_equipament" ADD CONSTRAINT "user_equipament_fk_id_role_fkey" FOREIGN KEY ("fk_id_role") REFERENCES "role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
