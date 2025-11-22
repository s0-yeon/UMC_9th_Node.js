-- AlterTable
ALTER TABLE `user` MODIFY `password_hash` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user_mission` ADD COLUMN `done_at` DATETIME(3) NULL;
