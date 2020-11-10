UPDATE clocked_user
SET clocked_time = stop - start
WHERE id = $1;