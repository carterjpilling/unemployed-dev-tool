UPDATE user_jobs
SET job_status = $2,
    job_name = $3,
    job_company = $4,
    job_link = $5,
    job_notes = $6
WHERE id = $1;