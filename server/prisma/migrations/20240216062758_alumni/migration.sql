-- CreateTable
CREATE TABLE `eventdata` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(200) NOT NULL,
    `stime` VARCHAR(45) NOT NULL,
    `sdate` VARCHAR(45) NOT NULL,
    `ptime` VARCHAR(45) NULL,
    `pdate` VARCHAR(45) NULL,
    `description` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `joboppdata` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(200) NULL,
    `description` TEXT NULL,
    `ptime` VARCHAR(45) NULL,
    `pdate` VARCHAR(45) NULL,
    `link` VARCHAR(250) NULL,
    `img` BLOB NULL,
    `status` VARCHAR(30) NOT NULL DEFAULT 'pending',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `newsdata` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(200) NOT NULL,
    `ptime` VARCHAR(45) NOT NULL,
    `pdate` VARCHAR(45) NOT NULL,
    `description` TEXT NOT NULL,
    `img` BLOB NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `registration` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lname` VARCHAR(45) NULL,
    `fname` VARCHAR(45) NULL,
    `mname` VARCHAR(45) NULL,
    `phoneno` VARCHAR(45) NULL,
    `gender` VARCHAR(45) NULL,
    `address` VARCHAR(100) NULL,
    `bday` VARCHAR(45) NULL,
    `yeargrad` VARCHAR(45) NULL,
    `Image` VARCHAR(255) NULL,
    `email` VARCHAR(100) NULL,
    `role` VARCHAR(20) NULL,
    `password` VARCHAR(225) NULL,
    `employment_status` VARCHAR(100) NULL,
    `current_job` VARCHAR(100) NULL,
    `year_current_job` VARCHAR(45) NULL,
    `job_duration_after_grad` VARCHAR(100) NULL,
    `position_current_job` VARCHAR(100) NULL,
    `employment_type` VARCHAR(45) NULL,
    `place_current_job` VARCHAR(100) NULL,
    `engage_studies` VARCHAR(100) NULL,
    `enroll_studies` VARCHAR(100) NULL,
    `eligibility` VARCHAR(100) NULL,
    `date_created` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `date_modified` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `token` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `img` BLOB NOT NULL,
    `desc` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `activitylogs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `registration_id` INTEGER NOT NULL,
    `action` VARCHAR(20) NOT NULL,
    `before` TEXT NULL,
    `after` TEXT NULL,
    `description` VARCHAR(255) NULL,
    `date_created` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `date_modified` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
