UPDATE clocked_user
SET stop = NOW()
WHERE clocked_user_id = $1 AND stop is null AND date = $2
returning id;