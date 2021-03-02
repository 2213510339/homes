-- auto Generated on 2021-01-28
-- DROP TABLE IF EXISTS student;
use `home`;
CREATE TABLE student(
	id INT (11) NOT NULL AUTO_INCREMENT COMMENT 'id',
	`name` VARCHAR (50) NOT NULL COMMENT 'name',
	age INT (11) NOT NULL COMMENT 'age',
	stu_id VARCHAR (50) NOT NULL COMMENT 'stuId',
	PRIMARY KEY (id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT 'student';
