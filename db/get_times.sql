SELECT*FROM clocked_user
WHERE clocked_user_id = $1 AND clocked_time is not NULL;