SELECT cu.clock_option_id,cu.clocked_time, dd.date
FROM clocked_user cu
JOIN dev_dates dd ON cu.date = dd.id
WHERE dd.date = $2 AND cu.clocked_user_id = $1