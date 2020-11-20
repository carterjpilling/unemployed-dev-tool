CREATE TABLE dev_users(
id SERIAL PRIMARY KEY,
name TEXT,
email TEXT,
hash TEXT
);

CREATE TABLE clock_options(
option_id SERIAL PRIMARY KEY, 
name TEXT
);

CREATE TABLE clocked_user(
id SERIAL PRIMARY KEY,
clocked_user_id INT REFERENCES dev_users (id),
clock_option_id INT REFERENCES clock_options (option_id ),
start TIMESTAMP,
stop TIMESTAMP,
clocked_time INTERVAL,
date INT REFERENCES dev_dates (id)
);

CREATE TABLE dev_dates(
id SERIAL PRIMARY KEY,
date TEXT);

CREATE TABLE user_jobs(
id SERIAL PRIMARY KEY,
user_id INT REFERENCES dev_users (id),
date INT REFERENCES dev_dates (id),
job_status INT REFERNECES job_statuses(id),
job_name TEXT,
job_company TEXT,
job_link TEXT,
job_notes TEXT
);

CREATE TABLE dev_goals(
id SERIAL PRIMARY KEY,
post_text TEXT,
post_date_id INT REFERENCES dev_dates(id),
post_user_id INT REFERENCES dev_users(id)
);

CREATE TABLE job_statuses(
id SERIAL PRIMARY KEY,
status TEXT);