/*
  Warnings:

  - You are about to drop the column `metaData` on the `ZapRun` table. All the data in the column will be lost.
  - You are about to drop the column `zapId` on the `ZapRunOutbox` table. All the data in the column will be lost.
  - You are about to drop the `AvailableActions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AvailableTriggers` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[zapRunId]` on the table `ZapRunOutbox` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `metadata` to the `ZapRun` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zapRunId` to the `ZapRunOutbox` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Action" DROP CONSTRAINT "Action_actionId_fkey";

-- DropForeignKey
ALTER TABLE "Trigger" DROP CONSTRAINT "Trigger_triggerId_fkey";

-- DropForeignKey
ALTER TABLE "ZapRunOutbox" DROP CONSTRAINT "ZapRunOutbox_zapId_fkey";

-- DropIndex
DROP INDEX "Action_zapId_key";

-- DropIndex
DROP INDEX "ZapRunOutbox_zapId_key";

-- AlterTable
ALTER TABLE "ZapRun" DROP COLUMN "metaData",
ADD COLUMN     "metadata" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "ZapRunOutbox" DROP COLUMN "zapId",
ADD COLUMN     "zapRunId" TEXT NOT NULL;

-- DropTable
DROP TABLE "AvailableActions";

-- DropTable
DROP TABLE "AvailableTriggers";

-- CreateTable
CREATE TABLE "AvailableAction" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "AvailableAction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvailableTrigger" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "AvailableTrigger_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ZapRunOutbox_zapRunId_key" ON "ZapRunOutbox"("zapRunId");

-- AddForeignKey
ALTER TABLE "Trigger" ADD CONSTRAINT "Trigger_triggerId_fkey" FOREIGN KEY ("triggerId") REFERENCES "AvailableTrigger"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "AvailableAction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ZapRunOutbox" ADD CONSTRAINT "ZapRunOutbox_zapRunId_fkey" FOREIGN KEY ("zapRunId") REFERENCES "ZapRun"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
