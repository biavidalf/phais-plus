/*
  Warnings:

  - You are about to drop the column `active_principle_id` on the `medicines` table. All the data in the column will be lost.
  - You are about to drop the column `approvation_date` on the `medicines` table. All the data in the column will be lost.
  - You are about to drop the column `laboratory_id` on the `medicines` table. All the data in the column will be lost.
  - You are about to drop the column `medicine_type_id` on the `medicines` table. All the data in the column will be lost.
  - You are about to drop the column `pregnancy_risk_id` on the `medicines` table. All the data in the column will be lost.
  - You are about to drop the column `prescription_id` on the `medicines` table. All the data in the column will be lost.
  - You are about to drop the `_EquivalentGenerics` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EquivalentSimilars` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MedicineToPharmacologicalGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MedicineToTherapeuthicIndication` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `active_principles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `laboratories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `medicine_types` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pharmacological_groups` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pregnancy_risks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `prescriptions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `therapeuthic_indications` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[process_number]` on the table `medicines` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[registration_number]` on the table `medicines` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `active_principle` to the `medicines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `process_end_date` to the `medicines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `process_number` to the `medicines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registration_expiration_date` to the `medicines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registration_holder_company` to the `medicines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registration_number` to the `medicines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registration_status` to the `medicines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regulatory_category` to the `medicines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `therapeutic_class` to the `medicines` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_EquivalentGenerics" DROP CONSTRAINT "_EquivalentGenerics_A_fkey";

-- DropForeignKey
ALTER TABLE "_EquivalentGenerics" DROP CONSTRAINT "_EquivalentGenerics_B_fkey";

-- DropForeignKey
ALTER TABLE "_EquivalentSimilars" DROP CONSTRAINT "_EquivalentSimilars_A_fkey";

-- DropForeignKey
ALTER TABLE "_EquivalentSimilars" DROP CONSTRAINT "_EquivalentSimilars_B_fkey";

-- DropForeignKey
ALTER TABLE "_MedicineToPharmacologicalGroup" DROP CONSTRAINT "_MedicineToPharmacologicalGroup_A_fkey";

-- DropForeignKey
ALTER TABLE "_MedicineToPharmacologicalGroup" DROP CONSTRAINT "_MedicineToPharmacologicalGroup_B_fkey";

-- DropForeignKey
ALTER TABLE "_MedicineToTherapeuthicIndication" DROP CONSTRAINT "_MedicineToTherapeuthicIndication_A_fkey";

-- DropForeignKey
ALTER TABLE "_MedicineToTherapeuthicIndication" DROP CONSTRAINT "_MedicineToTherapeuthicIndication_B_fkey";

-- DropForeignKey
ALTER TABLE "medicines" DROP CONSTRAINT "medicines_active_principle_id_fkey";

-- DropForeignKey
ALTER TABLE "medicines" DROP CONSTRAINT "medicines_laboratory_id_fkey";

-- DropForeignKey
ALTER TABLE "medicines" DROP CONSTRAINT "medicines_medicine_type_id_fkey";

-- DropForeignKey
ALTER TABLE "medicines" DROP CONSTRAINT "medicines_pregnancy_risk_id_fkey";

-- DropForeignKey
ALTER TABLE "medicines" DROP CONSTRAINT "medicines_prescription_id_fkey";

-- AlterTable
ALTER TABLE "medicines" DROP COLUMN "active_principle_id",
DROP COLUMN "approvation_date",
DROP COLUMN "laboratory_id",
DROP COLUMN "medicine_type_id",
DROP COLUMN "pregnancy_risk_id",
DROP COLUMN "prescription_id",
ADD COLUMN     "active_principle" TEXT NOT NULL,
ADD COLUMN     "process_end_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "process_number" TEXT NOT NULL,
ADD COLUMN     "registration_expiration_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "registration_holder_company" TEXT NOT NULL,
ADD COLUMN     "registration_number" TEXT NOT NULL,
ADD COLUMN     "registration_status" TEXT NOT NULL,
ADD COLUMN     "regulatory_category" TEXT NOT NULL,
ADD COLUMN     "therapeutic_class" TEXT NOT NULL;

-- DropTable
DROP TABLE "_EquivalentGenerics";

-- DropTable
DROP TABLE "_EquivalentSimilars";

-- DropTable
DROP TABLE "_MedicineToPharmacologicalGroup";

-- DropTable
DROP TABLE "_MedicineToTherapeuthicIndication";

-- DropTable
DROP TABLE "active_principles";

-- DropTable
DROP TABLE "laboratories";

-- DropTable
DROP TABLE "medicine_types";

-- DropTable
DROP TABLE "pharmacological_groups";

-- DropTable
DROP TABLE "pregnancy_risks";

-- DropTable
DROP TABLE "prescriptions";

-- DropTable
DROP TABLE "therapeuthic_indications";

-- CreateIndex
CREATE UNIQUE INDEX "medicines_process_number_key" ON "medicines"("process_number");

-- CreateIndex
CREATE UNIQUE INDEX "medicines_registration_number_key" ON "medicines"("registration_number");
