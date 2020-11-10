INSERT INTO clocked_user
(clocked_user_id, clock_option_id, start, clockedin, clockedout)
VALUES
($1,$2,NOW(),TRUE, FALSE);