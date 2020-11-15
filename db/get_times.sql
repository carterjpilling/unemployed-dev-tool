SELECT cu.clock_option_id,clocked_time, dd.date
FROM clocked_user cu
JOIN dev_dates dd ON cu.date = dd.id
WHERE cu.clocked_user_id = 1 AND cu.date is not NULL;