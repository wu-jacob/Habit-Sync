CREATE TABLE "users" (
  "user_id" serial PRIMARY KEY NOT NULL,
  "email" varchar(50) NOT NULL,
  "display_name" varchar(50)
);

CREATE TABLE "habits" (
  "habit_id" serial PRIMARY KEY NOT NULL,
  "user_id" int NOT NULL,
  "image_url" varchar(200),
  "description" varchar(500),
  "date_started" date NOT NULL,
  "streak" int NOT NULL
);

CREATE TABLE "posts" (
  "post_id" serial PRIMARY KEY NOT NULL,
  "user_id" int NOT NULL,
  "habit_id" int NOT NULL,
  "date_created" date NOT NULL,
  "image_url" varchar(200) NOT NULL,
  "description" varchar(500)
);

ALTER TABLE "posts" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");

ALTER TABLE "habits" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");

ALTER TABLE "posts" ADD FOREIGN KEY ("habit_id") REFERENCES "habits" ("habit_id");
