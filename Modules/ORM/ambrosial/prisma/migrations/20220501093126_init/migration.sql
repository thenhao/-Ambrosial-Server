/*
  Warnings:

  - You are about to alter the column `totalItemPrice` on the `Computed_Orders` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,2)`.
  - The primary key for the `Distinct_Order_List` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `price` on the `Menu_Item` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,2)`.
  - You are about to alter the column `totalItemPrice` on the `Receipt` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,2)`.
  - A unique constraint covering the columns `[orderNo]` on the table `Distinct_Order_List` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[receiptId]` on the table `Payment_Invoice` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[orderNo]` on the table `Receipt` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Computed_Orders" ALTER COLUMN "totalItemPrice" SET DATA TYPE DECIMAL(10,2);
ALTER TABLE "Computed_Orders" DROP CONSTRAINT "Computed_Orders_orderNo_fkey";

-- AlterTable
ALTER TABLE "Receipt" DROP CONSTRAINT "Receipt_orderNo_fkey";

-- AlterTable
ALTER TABLE "Distinct_Order_List" DROP CONSTRAINT "Distinct_Order_List_pkey",
ADD COLUMN     "orderNoId" SERIAL NOT NULL,
ALTER COLUMN "orderNo" DROP DEFAULT,
ADD CONSTRAINT "Distinct_Order_List_pkey" PRIMARY KEY ("orderNoId");
DROP SEQUENCE "Distinct_Order_List_orderNo_seq";

-- AlterTable
ALTER TABLE "Menu_Item" ALTER COLUMN "src" SET DATA TYPE VARCHAR,
ALTER COLUMN "price" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "Receipt" ALTER COLUMN "totalItemPrice" SET DATA TYPE DECIMAL(10,2);


-- CreateIndex
CREATE UNIQUE INDEX "Distinct_Order_List_orderNo_key" ON "Distinct_Order_List"("orderNo");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_Invoice_receiptId_key" ON "Payment_Invoice"("receiptId");

-- CreateIndex
CREATE UNIQUE INDEX "Receipt_orderNo_key" ON "Receipt"("orderNo");
