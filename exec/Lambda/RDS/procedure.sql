DROP PROCEDURE IF EXISTS updateMbti;
DELIMITER $$
CREATE PROCEDURE updateMbti
             (IN inputType varchar(20))
BEGIN
    start transaction;
    update mbti set count = count+1 where type = inputType;
    select sum(count), (select count from mbti where type=inputType) from mbti;
    commit;
END $$
DELIMITER ;