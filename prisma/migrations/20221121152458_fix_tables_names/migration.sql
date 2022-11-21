/*
  Warnings:

  - You are about to drop the `Accounts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sessions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Transactions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Sessions" DROP CONSTRAINT "Sessions_userId_fkey";

-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_creditedAccountId_fkey";

-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_debitedAccountId_fkey";

-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_accountId_fkey";

-- DropTable
DROP TABLE "Accounts";

-- DropTable
DROP TABLE "Sessions";

-- DropTable
DROP TABLE "Transactions";

-- DropTable
DROP TABLE "Users";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "accountId" INTEGER NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "loginAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "logoutAt" TIMESTAMP(3),

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" SERIAL NOT NULL,
    "balance" INTEGER NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" SERIAL NOT NULL,
    "value" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "debitedAccountId" INTEGER NOT NULL,
    "creditedAccountId" INTEGER NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_id_accountId_key" ON "users"("id", "accountId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_debitedAccountId_fkey" FOREIGN KEY ("debitedAccountId") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_creditedAccountId_fkey" FOREIGN KEY ("creditedAccountId") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
