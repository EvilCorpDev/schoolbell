CREATE TABLE IF NOT EXISTS `profile`
(
    `id` varchar(36) NOT NULL PRIMARY KEY,
    `profile_name` varchar(200) NOT NULL,
    `is_active` INT
);

CREATE TABLE IF NOT EXISTS `schedule`
(
    `id` varchar(36) NOT NULL PRIMARY KEY,
    `time` varchar(6) NOT NULL,
    `duration` integer,
    `audio_path` varchar(200) NOT NULL,
    `profile_id` varchar(36) NOT NULL,
    FOREIGN KEY(`profile_id`) REFERENCES profile(`id`)
);
