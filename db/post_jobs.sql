INSERT INTO user_jobs
(user_id, date, job_status, job_name, job_company, job_link, job_description, job_notes)
VALUES
($1,$2, $3, $4, $5, $6, $7, $8);