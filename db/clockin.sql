INSERT INTO clocked_user
(clocked_user_id, clock_option_id, start, date)
VALUES
($1,$2,NOW(), NOW()::date);