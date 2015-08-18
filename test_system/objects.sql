/* */

-- tb_ - tables
-- sq_ - sequences
-- vw_ - views
-- ct_ - constraints
-- tr_ - triggers
-- pr_ - procedures
-- fn_ - functions
-- jf_ - java functions
-- jb_ - jobs

/*------------------------------------------------------------------------------------------*/
/*create table tb_errlog
(
    err_id number primary key not null, 
    err_msg varchar2(256), 
    err_dttm date
);*/
/*create table tb_audit
(
    dttm date,
    user_name varchar2(32),
    action varchar2(32),
    sql_text varchar(512)
);*/

/*create or replace function pr_month(p_src varchar2, p_case integer)  return varchar2 as
    type r_assoc_ending is record(src varchar2(1), out_r varchar2(1));
    type t_assoc_ending is table of r_assoc_ending index by binary_integer;
    v_endings t_assoc_ending;
    v_new_month varchar2(16);
    v_i number := 1;
    v_patronymic varchar2(32);
    v_curr_ending varchar2(64);
    v_curr_index number;
begin
    v_endings(1).src := 'Ь';v_endings(1).out_r := 'Я';
    v_endings(2).src := 'Т';v_endings(2).out_r := 'А';
    v_endings(3).src := 'Й';v_endings(3).out_r := 'Я';

    v_curr_ending:= substr(p_src,length(p_src)-1,1);
    for v_i in 1..v_endings.count loop
            if 
                v_curr_ending = v_endings(v_i).src
            then 
                v_curr_index := v_i;
                exit;
            else
                v_curr_index := 0;
            end if;
            if 
                v_curr_index != 0
            then
                exit;
            end if;
    end loop;
   v_new_month := concat(substr(p_src,1,length(p_src)-length(v_endings(v_curr_index).src)),v_endings(v_curr_index).out_r);
   return v_new_month;
end;*/

------------------------------------------------------------------------------------------------
-- группа пользователей Админ, Препод, Студент
/*create table tb_group
(
    group_id number primary key,
    group_name varchar2(32),
    group_flg char(1) check (group_flg in ('Y','N'))
);*/
--create sequence sq_group start with 1;
/*create or replace trigger tr_groupid
before insert on tb_group for each row
begin
    if 
        :new.group_id is NULL
    then 
        :new.group_id := sq_group.nextval;
    end if;
end;*/
--insert into tb_group(group_name,group_flg) values ('администратор','Y');
--insert into tb_group(group_name,group_flg) values ('преподаватель','Y');
--insert into tb_group(group_name,group_flg) values ('студент','Y');

/*create table tb_group_char
(   
    group_id number,
    char_type_cd varchar2(8),
    char_val varchar2(64),
    char_fk varchar2(8),
    char_descr varchar(512),
    char_dttm date
);*/
/*alter table tb_group_char
add constraint group_char_fk 
foreign key(group_id) references tb_group(group_id) 
on delete cascade*/

------------------------------------------------------------------------------------------------

-- тест
-- O - open, P - pending
-- O between from_dttm and till_dttm
/*create table tb_test
(
    test_id number primary key,
    test_name varchar2(128),
    test_descr varchar2(256),
    status_flg char(1) default 'O' check (status_flg in ('O','P')),
    from_dttm date,
    till_dttm date,
    owner_id number
);*/
--create sequence sq_test start with 1;
/*create or replace trigger tr_testid
before insert on tb_test for each row
begin
    if 
        :new.test_id is NULL
    then 
        :new.test_id := sq_test.nextval;
    end if;
end;*/

/*create table tb_test_char
(   
    test_id number,
    char_type_cd varchar2(8),
    char_val varchar2(64),
    char_fk varchar2(8),
    char_descr varchar(512),
    char_dttm date
);*/
/*alter table tb_test_char
add constraint test_char_fk 
foreign key(test_id) references tb_test(test_id) 
on delete cascade*/

------------------------------------------------------------------------------------------------

-- пользователь
-- V - valid, N - not valid
/*create table tb_user
(
    user_id number primary key,
    group_id number,
    user_fname varchar2(64),
    user_mname varchar2(64),
    user_lname varchar2(64),
    user_password varchar(8),
    --user_rate number(5,2),--for char
    status_flg char(1) default 'V' check (status_flg in ('V','N')),
    reg_dttm date
);*/
/*alter table tb_user 
add constraint user_group_fk 
foreign key(group_id) references tb_group(group_id) 
on delete cascade*/
--create sequence sq_user start with 1;
/*create or replace trigger tr_userid
before insert on tb_user for each row
begin
    if 
        :new.user_id is NULL
    then 
        :new.user_id := sq_user.nextval;
    end if;
end;*/

------------------------------------------------------------------------------------------------
-- характеристики пользователя
/*create table tb_user_char
(
    user_id number,
    char_type_cd varchar2(8),
    char_val varchar2(64),
    char_fk varchar2(8),
    char_descr varchar(512),
    char_dttm date
);*/
/*alter table tb_user_char
add constraint user_char_fk 
foreign key(user_id) references tb_user(user_id) 
on delete cascade*/
------------------------------------------------------------------------------------------------

-- вопросы
-- A - active, S - stoped
/*create table tb_question
(
    question_id number primary key,
    test_id number,
    question_text varchar2(512),
    question_descr varchar2(1024),
    question_time number,
    question_ball number,
    question_type number default 0 check (question_type in (0,1)),
    status_flg char(1) default 'A' check (status_flg in ('A','S')),
    dttm date
);*/
/*alter table tb_question
add constraint question_test_fk 
foreign key(test_id) references tb_test(test_id) 
on delete cascade*/
--create sequence sq_question start with 1;
/*create or replace trigger tr_questionid
before insert on tb_question for each row
begin
    if 
        :new.question_id is NULL
    then 
        :new.question_id := sq_question.nextval;
    end if;
end;*/

/*create table tb_question_char
(   
    question_id number,
    char_type_cd varchar2(8),
    char_val varchar2(64),
    char_fk varchar2(8),
    char_descr varchar(512),
    char_dttm date
);*/
/*alter table tb_question_char
add constraint question_char_fk 
foreign key(question_id) references tb_question(question_id) 
on delete cascade*/

------------------------------------------------------------------------------------------------

-- ответы
-- A - active, S - stoped
/*create table tb_answer
(
    answer_id number primary key,
    question_id number,
    answer_text varchar2(512),
    answer_right number default 0 check (answer_right in (0,1)),
    question_time number,
    status_flg char(1) default 'A' check (status_flg in ('A','S')),
    dttm date
);*/
/*alter table tb_answer
add constraint answer_question_fk 
foreign key(question_id) references tb_question(question_id) 
on delete cascade*/
--create sequence sq_answer start with 1;
/*create or replace trigger tr_answerid
before insert on tb_answer for each row
begin
    if 
        :new.answer_id is NULL
    then 
        :new.answer_id := sq_answer.nextval;
    end if;
end;*/

/*create table tb_answer_char
(   
    answer_id number,
    char_type_cd varchar2(8),
    char_val varchar2(64),
    char_fk varchar2(8),
    char_descr varchar(512),
    char_dttm date
);*/
/*alter table tb_answer_char
add constraint answer_char_fk 
foreign key(answer_id) references tb_answer(answer_id) 
on delete cascade*/


------------------------------------------------------------------------------------------------

-- ответы на тест, записываются только не верные ответы
/*create table tb_user_answers
(
    user_id number,
    test_id number,
    question_id number,
    user_answer number,
    test_dttm date,
    unique_test number
);*/
/*alter table tb_user_answers
add constraint ua_user_fk 
foreign key(user_id) references tb_user(user_id)
on delete cascade*/

/*alter table tb_user_answers
add constraint ua_test_fk 
foreign key(test_id) references  tb_test(test_id)
on delete cascade*/


/*alter table tb_user_answers
add constraint ua_question_fk 
foreign key(question_id) references  tb_question(question_id)
on delete cascade*/

/*alter table tb_user_answers
add constraint ua_answer_fk 
foreign key(user_answer) references  tb_answer(answer_id)
on delete cascade*/

------------------------------------------------------------------------------------------------

-- user results
/*create table tb_user_results
(
    user_id number,
    test_id number,
    result number,
    answers_wrong number,
    answers_right number,
    answers_time number,
    unique_test number,
    test_dttm date
);*/

/*alter table tb_user_results
add constraint ur_test_fk 
foreign key(test_id) references  tb_test(test_id)
on delete cascade*/

/*alter table tb_user_results
add constraint ur_user_fk 
foreign key(user_id) references  tb_user(user_id)
on delete cascade*/

------------------------------------------------------------------------------------------------

/*create table tb_char_val
(
    char_type_cd varchar2(8) primary key,
    char_descr varchar2(128) not null,
    char_dttm date
);*/

/*create table tb_char_object
(
    char_type_cd varchar2(8),
    object_id number
);*/

/*select * 
from user_objects 
where object_type = 'TABLE'
order by object_name*/

------------------------------------------------------------------------------------------------

--media
/*create table tb_media
(
    media_id number primary key,
    media_name varchar2(32),
    media_data blob,
    media_type varchar2(32),
    question_id number,
    dttm date
);*/
--create sequence sq_media start with 1;
/*alter table tb_media
add constraint media_question_fk 
foreign key(question_id) references  tb_question(question_id)
on delete cascade*/
/*create or replace trigger tr_mediaid
before insert on tb_media for each row
begin
    if 
        :new.media_id is NULL
    then 
        :new.media_id := sq_media.nextval;
    end if;
end;*/

/*create table tb_material
(
    material_id number primary key,
    material_name varchar2(32),
    material_data blob,
    material_type varchar2(32),
    test_id number,
    owner_id number,
    dttm date
);*/
--create sequence sq_material start with 1;
/*alter table tb_material
add constraint material_test_fk 
foreign key(test_id) references  tb_test(test_id)
on delete cascade*/

/*alter table tb_material
add constraint material_user_fk 
foreign key(owner_id) references  tb_user(user_id)
on delete cascade*/

/*create or replace trigger tr_materialid
before insert on tb_material for each row
begin
    if 
        :new.material_id is NULL
    then 
        :new.material_id := sq_material.nextval;
    end if;
end;*/

------------------------------------------------------------------------------------------------
--comments
/*create table tb_review
(
    review_id number primary key,
    user_id varchar2(32),
    message varchar2(1024),
    dttm date
);
--create sequence sq_review start with 1;
create or replace trigger tr_reviewid
before insert on tb_review for each row
begin
    if 
        :new.review_id is NULL
    then 
        :new.review_id := sq_review.nextval;
    end if;
end;

create or replace trigger tr_reviewdttm
before insert on tb_review for each row
begin
    if 
        :new.dttm is NULL
    then 
        :new.dttm := sysdate;
    end if;
end;

alter table tb_review
add constraint review_user_fk 
foreign key(user_id) references tb_user(user_id) 
on delete cascade*/