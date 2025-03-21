/*
  Warnings:

  - You are about to drop the column `clienteId` on the `Agendamento` table. All the data in the column will be lost.
  - You are about to alter the column `preco` on the `Servico` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to drop the `Cliente` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Agendamento` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- DropForeignKey
ALTER TABLE "Agendamento" DROP CONSTRAINT "Agendamento_clienteId_fkey";

-- AlterTable
ALTER TABLE "Agendamento" DROP COLUMN "clienteId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Servico" ALTER COLUMN "preco" SET DATA TYPE DOUBLE PRECISION;

-- DropTable
DROP TABLE "Cliente";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT,
    "senha" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "Agendamento" ADD CONSTRAINT "Agendamento_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
