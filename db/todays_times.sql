SELECT*FROM clocked_user
WHERE DATE = now()::date AND clocked_user_id = $1