/*
  Warnings:

  - You are about to drop the column `orderNo` on the `Computed_Orders` table. All the data in the column will be lost.
  - You are about to drop the column `orderNo` on the `Receipt` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[orderNoId]` on the table `Receipt` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderNoId` to the `Computed_Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderNoId` to the `Receipt` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Receipt_orderNo_key";

-- AlterTable
ALTER TABLE "Computed_Orders" DROP COLUMN "orderNo",
ADD COLUMN     "orderNoId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Receipt" DROP COLUMN "orderNo",
ADD COLUMN     "orderNoId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Receipt_orderNoId_key" ON "Receipt"("orderNoId");

-- AddForeignKey
ALTER TABLE "Computed_Orders" ADD CONSTRAINT "Computed_Orders_orderNoId_fkey" FOREIGN KEY ("orderNoId") REFERENCES "Distinct_Order_List"("orderNoId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receipt" ADD CONSTRAINT "Receipt_orderNoId_fkey" FOREIGN KEY ("orderNoId") REFERENCES "Distinct_Order_List"("orderNoId") ON DELETE RESTRICT ON UPDATE CASCADE;
