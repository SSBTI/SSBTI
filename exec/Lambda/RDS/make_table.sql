create table mbti (
        mbti_id bigint not null auto_increment,
        count integer default 0,
        description TEXT,
        img varchar(255),
        name varchar(255),
        type varchar(255),
        primary key (mbti_id)
    ) engine=InnoDB;
    
create table relationship (
       relationship_id bigint not null auto_increment,
        type varchar(255),
        from_id bigint,
        to_id bigint,
        primary key (relationship_id)
    ) engine=InnoDB;
    
alter table relationship 
       add constraint FKml007tic6cv9bnvy46o9cy3rs 
       foreign key (from_id) 
       references mbti (mbti_id);
       
alter table relationship 
       add constraint FKb1y770qi8josh0r2jvh0u2f5t 
       foreign key (to_id) 
       references mbti (mbti_id);