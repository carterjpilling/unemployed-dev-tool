UPDATE user_jobs
SET job_status = $2,
    job_name = $3,
    job_company = $4,
    job_link = $5,
    job_description = $6,
    job_notes = $7
WHERE id = $1;