CREATE TABLE IF NOT EXISTS `profile`
(
    `id` varchar(36) NOT NULL PRIMARY KEY,
    `name` varchar(200) NOT NULL,
    `is_active` INT default 1
);

CREATE TABLE IF NOT EXISTS `schedule`
(
    `id` varchar(36) NOT NULL PRIMARY KEY,
    `time` varchar(6) NOT NULL,
    `duration` integer,
    `start_sec` integer,
    `audio_path` varchar(200) NOT NULL,
    `profile_id` varchar(36) NOT NULL,
    FOREIGN KEY(`profile_id`) REFERENCES profile(`id`)
);
