DO $$ BEGIN
 CREATE TYPE "movie_states" AS ENUM('billboard', 'upcoming');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "admins" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	"email" text NOT NULL
);

CREATE TABLE IF NOT EXISTS "billboard" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"image" text NOT NULL
);

CREATE TABLE IF NOT EXISTS "movies" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"overview" text,
	"poster_path" text NOT NULL,
	"backdrop_path" text,
	"rating" integer,
	"trailer" text,
	"movie_states" movie_states
);

CREATE TABLE IF NOT EXISTS "products" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"status" text NOT NULL
);

CREATE TABLE IF NOT EXISTS "rooms" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"room_status" jsonb
);

CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"admin" boolean NOT NULL
);
