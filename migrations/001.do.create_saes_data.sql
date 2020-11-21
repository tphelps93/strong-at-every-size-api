DROP TABLE IF EXISTS saes_testimonies;
DROP TABLE IF EXISTS saes_articles;
DROP TABLE IF EXISTS saes_promos;
DROP TABLE IF EXISTS user_reviews;
DROP TABLE IF EXISTS user_purchases;
DROP TABLE IF EXISTS saes_programs;
DROP TABLE IF EXISTS saes_items;
DROP TABLE IF EXISTS saes_users;

DROP TYPE IF EXISTS item_type;

CREATE TYPE item_type AS ENUM (
    'Programs',
    'Apparel',
    'Equipment'
);

CREATE TABLE saes_users (
    user_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    photo VARCHAR(2000),
    name TEXT NOT NULL,
    user_name TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    email TEXT NOT NULL,
    address TEXT NOT NULL,
    state TEXT NOT NULL,
    zip INTEGER NOT NULL,
    isAdmin BOOLEAN NOT NULL DEFAULT FALSE,
    date_created TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE saes_items (
    item_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    photo varchar(2000),
    title TEXT NOT NULL,
    price TEXT NOT NULL,
    category item_type NOT NULL,
    description TEXT NOT NULL,
    date_created TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE saes_programs (
    program_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    title TEXT NOT NULL,
    price TEXT NOT NULL,
    description TEXT NOT NULL,
    date_created TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE user_purchases (
    purchase_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    title TEXT NOT NULL,
    price TEXT NOT NULL,
    category item_type NOT NULL,
    date_purchased TIMESTAMPTZ DEFAULT now() NOT NULL,
    userId INTEGER REFERENCES saes_users(user_id) ON DELETE CASCADE NULL,
    itemId INTEGER REFERENCES saes_items(item_id) ON DELETE CASCADE NULL,
    programId INTEGER REFERENCES saes_programs(program_id) ON DELETE CASCADE NULL
);

CREATE TABLE user_reviews (
    review_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    content TEXT NOT NULL,
    rating INTEGER NOT NULL,
    date_created TIMESTAMPTZ DEFAULT now() NOT NULL,
    programId INTEGER REFERENCES saes_programs(program_id) ON DELETE CASCADE NULL,
    itemId INTEGER REFERENCES saes_items(item_id) ON DELETE CASCADE NULL,
    userId INTEGER REFERENCES saes_users(user_id) ON DELETE CASCADE NULL
);

CREATE TABLE saes_promos (
    promo_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    date_created TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE saes_articles (
    article_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    date_created TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE saes_testimonies (
    testimony_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    photo VARCHAR(2000),
    content TEXT NOT NULL,
    date_created TIMESTAMPTZ DEFAULT now() NOT NULL
);