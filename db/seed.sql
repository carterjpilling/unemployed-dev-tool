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
job TEXT,
user_id INT REFERENCES dev_users (id),
date INT REFERENCES dev_dates (id)
);