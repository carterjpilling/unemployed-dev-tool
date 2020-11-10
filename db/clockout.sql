UPDATE clocked_user
SET stop = NOW(), clockedout = true
WHERE clocked_user_id = $1 AND clockedout = false
returning id;