-- CreateTable
CREATE TABLE "accounts_payment_details" (
    "id" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "bankAccountNumber" TEXT NOT NULL,
    "bankRoutingNumber" TEXT NOT NULL,
    "account_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "accounts_payment_details_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_payment_details_account_id_key" ON "accounts_payment_details"("account_id");

-- AddForeignKey
ALTER TABLE "accounts_payment_details" ADD CONSTRAINT "accounts_payment_details_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
