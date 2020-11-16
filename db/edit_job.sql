UPDATE user_jobs
SET job = $2
WHERE id = $1;