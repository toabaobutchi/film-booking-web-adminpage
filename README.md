## Tạo bảng

```sql
CREATE TABLE IF NOT EXISTS `room` (
	`id` int AUTO_INCREMENT ,
	`name` text NOT NULL ,
	`seats` int NOT NULL ,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `ticket` (
	`id` int AUTO_INCREMENT ,
	`showtime_id` int NOT NULL ,
	`user_id` int NOT NULL ,
	`creation_time` timestamp NOT NULL ,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `category` (
	`id` int AUTO_INCREMENT ,
	`name` text NOT NULL ,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `film` (
	`id` int AUTO_INCREMENT ,
	`name` text NOT NULL ,
	`director` text NOT NULL ,
	`launch_date` timestamp NOT NULL ,
	`time` int NOT NULL ,
	`description` text NOT NULL ,
	`poster` text NOT NULL ,
	`finish_date` timestamp ,
	`actors` text NOT NULL ,
	`rated` text NOT NULL ,
	`category_id` int NOT NULL ,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `showtime` (
	`id` int AUTO_INCREMENT,
	`room_id` int NOT NULL ,
	`film_id` int NOT NULL ,
	`time` timestamp NOT NULL ,
	`price` decimal
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `ticket_detail` (
	`id` int AUTO_INCREMENT ,
	`ticket_id` int NOT NULL ,
	`seat_index` int NOT NULL ,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `role` (
	`id` int AUTO_INCREMENT ,
	`name` int NOT NULL ,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `staff` (
	`id` int AUTO_INCREMENT,
	`username` text NOT NULL ,
	`password` varchar(30) NOT NULL ,
	`email` varbinary(100) NOT NULL ,
	`role_id` int NOT NULL ,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `_user` (
	`id` int AUTO_INCREMENT ,
	`_email` text NOT NULL ,
	`_name` text NOT NULL ,
	`_phone` varchar(10) NOT NULL ,
	`_address` text NOT NULL ,
	PRIMARY KEY (`id`)
);


ALTER TABLE `ticket` ADD CONSTRAINT `ticket_fk1` FOREIGN KEY (`showtime_id`) REFERENCES `showtime`(`id`);

ALTER TABLE `ticket` ADD CONSTRAINT `ticket_fk2` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`);

ALTER TABLE `film` ADD CONSTRAINT `film_fk10` FOREIGN KEY (`categoryid`) REFERENCES `category`(`id`);
ALTER TABLE `showtime` ADD CONSTRAINT `showtime_fk1` FOREIGN KEY (`room_id`) REFERENCES `room`(`id`);

ALTER TABLE `showtime` ADD CONSTRAINT `showtime_fk2` FOREIGN KEY (`film_id`) REFERENCES `film`(`id`);
ALTER TABLE `ticket_detail` ADD CONSTRAINT `ticket_detail_fk1` FOREIGN KEY (`ticket_id`) REFERENCES `ticket`(`id`);

ALTER TABLE `staff` ADD CONSTRAINT `staff_fk4` FOREIGN KEY (`role_id`) REFERENCES `role`(`id`);
```
