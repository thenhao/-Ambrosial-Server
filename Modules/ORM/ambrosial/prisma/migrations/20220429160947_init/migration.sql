-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "password" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Menu_Item" (
    "menuItemId" SERIAL NOT NULL,
    "src" VARCHAR(50) NOT NULL,
    "alt" VARCHAR(50) NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "price" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Menu_Item_pkey" PRIMARY KEY ("menuItemId")
);

-- CreateTable
CREATE TABLE "Computed_Orders" (
    "orderId" SERIAL NOT NULL,
    "orderNo" INTEGER NOT NULL,
    "menuItemId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "totalItemPrice" INTEGER NOT NULL,
    "tableNo" INTEGER NOT NULL,
    "orderStatus" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Computed_Orders_pkey" PRIMARY KEY ("orderId")
);

-- CreateTable
CREATE TABLE "Distinct_Order_List" (
    "orderNo" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Distinct_Order_List_pkey" PRIMARY KEY ("orderNo")
);

-- CreateTable
CREATE TABLE "Receipt" (
    "receiptId" SERIAL NOT NULL,
    "orderNo" INTEGER NOT NULL,
    "totalItemPrice" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Receipt_pkey" PRIMARY KEY ("receiptId")
);

-- CreateTable
CREATE TABLE "Payment_Invoice" (
    "paymentInvoiceId" SERIAL NOT NULL,
    "receiptId" INTEGER NOT NULL,
    "paymentType" VARCHAR(50) NOT NULL,
    "paymentStatus" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_Invoice_pkey" PRIMARY KEY ("paymentInvoiceId")
);

-- AddForeignKey
ALTER TABLE "Computed_Orders" ADD CONSTRAINT "Computed_Orders_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "Menu_Item"("menuItemId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Computed_Orders" ADD CONSTRAINT "Computed_Orders_orderNo_fkey" FOREIGN KEY ("orderNo") REFERENCES "Distinct_Order_List"("orderNo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receipt" ADD CONSTRAINT "Receipt_orderNo_fkey" FOREIGN KEY ("orderNo") REFERENCES "Distinct_Order_List"("orderNo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment_Invoice" ADD CONSTRAINT "Payment_Invoice_receiptId_fkey" FOREIGN KEY ("receiptId") REFERENCES "Receipt"("receiptId") ON DELETE RESTRICT ON UPDATE CASCADE;
