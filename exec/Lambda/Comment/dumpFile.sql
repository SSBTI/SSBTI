CREATE SCHEMA `comment` DEFAULT CHARACTER SET utf8mb4 ;
use comment;
create table comment (
        id bigint not null auto_increment,
        review_id bigint not null,
        content text,
        nickname varchar(255),
        password varchar(255),
        primary key (id)
) engine=InnoDB;