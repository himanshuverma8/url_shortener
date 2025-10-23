-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" varchar(55) NOT NULL,
	"last_name" varchar(55),
	"email" varchar(255) NOT NULL,
	"password" text NOT NULL,
	"salt" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_id_not_null" CHECK (NOT NULL id),
	CONSTRAINT "users_first_name_not_null" CHECK (NOT NULL first_name),
	CONSTRAINT "users_email_not_null" CHECK (NOT NULL email),
	CONSTRAINT "users_password_not_null" CHECK (NOT NULL password),
	CONSTRAINT "users_salt_not_null" CHECK (NOT NULL salt),
	CONSTRAINT "users_created_at_not_null" CHECK (NOT NULL created_at)
);

*/