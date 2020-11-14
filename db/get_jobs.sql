SELECT uj.id, uj.job, du.name as NAME, dd.date as DATE
FROM user_jobs uj
JOIN dev_users du ON uj.user_id = du.id
JOIN dev_dates dd ON uj.date = dd.id
WHERE du.id = $1 AND dd.date = $2;