-- AlterTable
ALTER TABLE "medicines" ALTER COLUMN "active_principle" DROP NOT NULL,
ALTER COLUMN "process_end_date" DROP NOT NULL,
ALTER COLUMN "registration_expiration_date" DROP NOT NULL,
ALTER COLUMN "regulatory_category" DROP NOT NULL,
ALTER COLUMN "therapeutic_class" DROP NOT NULL;
