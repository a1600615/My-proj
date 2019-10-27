create table users(
	id serial primary key,
	username varchar(255) unique,
	email varchar(255),
	email_verified boolean,
	date_created date,
	last_login date
)
/*the date doesnt come from the client side but the db will assign