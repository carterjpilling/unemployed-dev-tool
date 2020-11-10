UPDATE clocked_user
SET stop = NOW()
WHERE clocked_user_id = $1 AND stop is null
returning id;