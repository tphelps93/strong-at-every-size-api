BEGIN;

TRUNCATE 
    saes_testimonies,
    saes_articles,
    saes_promos,
    user_reviews,
    user_purchases,
    saes_users,   
    saes_items,
    saes_programs
    RESTART IDENTITY CASCADE;

/* saes_users */


insert into saes_users (user_id, photo, name, user_name, password, email, address, state, zip, isAdmin) values (1, 'http://dummyimage.com/130x147.png/dddddd/000000', 'Maryanne Errey', 'merrey0', '$2a$12$rbmLFCNIs3w/jntWJp7T5OaCcD6M4APSCMshfQOczq8Fi3o4A4W46', 'merrey0@jiathis.com', '3 Hazelcrest Street', 'TX', '78769', false);
insert into saes_users (user_id, photo, name, user_name, password, email, address, state, zip, isAdmin) values (2, 'http://dummyimage.com/220x216.png/ff4444/ffffff', 'Aidan Severn', 'asevern1', '$2a$12$mj4KeEMOU7iTx5KJ7hV.s.jIgE2tV42qnmkoAchH4CsDh/PEAIPUi', 'asevern1@yolasite.com', '9676 1st Hill', 'NE', '68124', false);
insert into saes_users (user_id, photo, name, user_name, password, email, address, state, zip, isAdmin) values (3, 'http://dummyimage.com/249x185.bmp/ff4444/ffffff', 'Ruth Deacon', 'rdeacon2', '$2a$12$DwQt.3/AxSFyFvRsKvYlX.sQ2270hLId5uA3yRh4JbX/LRwlQfELy', 'rdeacon2@jugem.jp', '34210 Wayridge Road', 'MA', '01152', false);
insert into saes_users (user_id, photo, name, user_name, password, email, address, state, zip, isAdmin) values (4, 'http://dummyimage.com/197x100.bmp/5fa2dd/ffffff', 'Udale Smellie', 'usmellie3', '$2a$12$fEl246uIFg6Icojb7NcCCOI/yf.RsdGeG8bYvp7yl/u6zOlKOi3t.', 'usmellie3@cargocollective.com', '82285 7th Parkway', 'WV', '25356', false);
insert into saes_users (user_id, photo, name, user_name, password, email, address, state, zip, isAdmin) values (5, 'http://dummyimage.com/120x139.png/ff4444/ffffff', 'Vinnie Crowest', 'vcrowest4', '$2a$12$KBPgg5rDGdoeomSqfbgFPeztGBpJpUeUUuxY1MM4EteD8AXRCnt0K', 'vcrowest4@about.me', '5248 Londonderry Crossing', 'GA', '30328', false);


SELECT setval('saes_users_user_id_seq', max(user_id)) FROM saes_users;
/* saes_items */

insert into saes_items (item_id, title, price, category, description, date_created) values (1, 'quis turpis', '$4.64', 'Apparel', 'Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.', '9/16/2020');
insert into saes_items (item_id, title, price, category, description, date_created) values (2, 'ante vestibulum', '$3.29', 'Apparel', 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque. Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.', '4/29/2020');
insert into saes_items (item_id, title, price, category, description, date_created) values (3, 'at nibh', '$2.63', 'Apparel', 'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue.', '3/20/2020');
insert into saes_items (item_id, title, price, category, description, date_created) values (4, 'turpis enim', '$1.27', 'Apparel', 'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy.', '7/8/2020');
insert into saes_items (item_id, title, price, category, description, date_created) values (5, 'primis in', '$1.15', 'Apparel', 'Donec posuere metus vitae ipsum. Aliquam non mauris. Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.', '3/2/2020');
insert into saes_items (item_id, title, price, category, description, date_created) values (6, 'congue etiam', '$7.99', 'Apparel', 'Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat. Nulla nisl. Nunc nisl.', '6/26/2020');
insert into saes_items (item_id, title, price, category, description, date_created) values (7, 'platea dictumst', '$2.70', 'Apparel', 'Quisque ut erat.', '10/27/2020');
insert into saes_items (item_id, title, price, category, description, date_created) values (8, 'lectus pellentesque', '$2.41', 'Apparel', 'Pellentesque ultrices mattis odio. Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.', '6/14/2020');
insert into saes_items (item_id, title, price, category, description, date_created) values (9, 'in porttitor', '$4.94', 'Apparel', 'Nulla facilisi.', '4/2/2020');
insert into saes_items (item_id, title, price, category, description, date_created) values (10, 'mattis odio', '$3.98', 'Apparel', 'Nunc rhoncus dui vel sem. Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci.', '6/13/2020');
insert into saes_items (item_id, title, price, category, description, date_created) values (11, 'sed tincidunt', '$7.24', 'Apparel', 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo.', '8/13/2020');
insert into saes_items (item_id, title, price, category, description, date_created) values (12, 'eu sapien', '$8.00', 'Apparel', 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus item_id, turpis.', '3/7/2020');
insert into saes_items (item_id, title, price, category, description, date_created) values (13, 'at turpis', '$9.37', 'Apparel', 'Praesent blandit lacinia erat.', '5/10/2020');
insert into saes_items (item_id, title, price, category, description, date_created) values (14, 'nulla facilisi', '$0.82', 'Apparel', 'Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio.', '1/24/2020');
insert into saes_items (item_id, title, price, category, description, date_created) values (15, 'nulla tellus', '$5.86', 'Apparel', 'Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum.', '8/8/2020');
insert into saes_items (item_id, title, price, category, description, date_created) values (16, 'curabitur at', '$5.64', 'Apparel', 'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl.', '7/30/2020');
insert into saes_items (item_id, title, price, category, description, date_created) values (17, 'sed vel', '$4.80', 'Apparel', 'Curabitur convallis.', '5/5/2020');
insert into saes_items (item_id, title, price, category, description, date_created) values (18, 'mauris lacinia', '$4.03', 'Apparel', 'Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc.', '8/6/2020');
insert into saes_items (item_id, title, price, category, description, date_created) values (19, 'ut suscipit', '$5.66', 'Apparel', 'Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.', '11/22/2019');

SELECT setval('saes_items_item_id_seq', max(item_id)) FROM saes_items;

/* saes_programs */

insert into saes_programs (program_id, title, price, description, date_created) values (1, 'in', '$8.22', 'Suspendisse potenti. In eleifend quam a odio.', '5/13/2020');
insert into saes_programs (program_id, title, price, description, date_created) values (2, 'pede', '$2.05', 'Pellentesque at nulla. Suspendisse potenti.', '3/30/2020');
insert into saes_programs (program_id, title, price, description, date_created) values (3, 'tristique', '$5.39', 'Suspendisse potenti. In eleifend quam a odio.', '6/18/2020');
insert into saes_programs (program_id, title, price, description, date_created) values (4, 'curae', '$8.79', 'Mauris ullamcorper purus sit amet nulla.', '9/21/2020');
insert into saes_programs (program_id, title, price, description, date_created) values (5, 'nisi', '$6.27', 'Morbi non quam nec dui luctus rutrum. Nulla tellus.', '1/15/2020');
insert into saes_programs (program_id, title, price, description, date_created) values (6, 'integer', '$1.46', 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo.', '8/29/2020');
insert into saes_programs (program_id, title, price, description, date_created) values (7, 'nascetur', '$0.35', 'Maecenas tincidunt lacus at velit.', '10/13/2020');
insert into saes_programs (program_id, title, price, description, date_created) values (8, 'eget', '$11.15', 'Nullam molestie nibh in lectus. Pellentesque at nulla.', '4/3/2020');
insert into saes_programs (program_id, title, price, description, date_created) values (9, 'quam', '$12.30', 'Nulla nisl.', '3/1/2020');
insert into saes_programs (program_id, title, price, description, date_created) values (10, 'platea', '$6.57', 'Aenean lectus. Pellentesque eget nunc.', '1/10/2020');
insert into saes_programs (program_id, title, price, description, date_created) values (11, 'amet', '$1.06', 'Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.', '7/11/2020');
insert into saes_programs (program_id, title, price, description, date_created) values (12, 'vivamus', '$13.89', 'Maecenas rhoncus aliquam lacus.', '1/30/2020');
insert into saes_programs (program_id, title, price, description, date_created) values (13, 'pede', '$7.04', 'In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat.', '7/8/2020');
insert into saes_programs (program_id, title, price, description, date_created) values (14, 'nullam', '$5.28', 'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus.', '5/10/2020');
insert into saes_programs (program_id, title, price, description, date_created) values (15, 'ipsum', '$5.85', 'Etiam pretium iaculis justo.', '3/18/2020');
insert into saes_programs (program_id, title, price, description, date_created) values (16, 'at', '$12.10', 'Vivamus in felis eu sapien cursus vestibulum.', '7/17/2020');
insert into saes_programs (program_id, title, price, description, date_created) values (17, 'id', '$4.67', 'Nullam varius. Nulla facilisi.', '3/17/2020');
insert into saes_programs (program_id, title, price, description, date_created) values (18, 'sapien', '$7.71', 'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.', '2/1/2020');
insert into saes_programs (program_id, title, price, description, date_created) values (19, 'praesent', '$11.04', 'Donec quis orci eget orci vehicula condimentum.', '3/3/2020');

SELECT setval('saes_programs_program_id_seq', max(program_id)) FROM saes_programs;

/* user_purchases */

insert into user_purchases (purchase_id, title, price, category, itemId, userId, programId) values (1, 'quis turpis', '$4.64', 'Apparel', 1, 1, null);
insert into user_purchases (purchase_id, title, price, category, itemId, userId, programId) values (2, 'ante vestibulum', '$3.29', 'Apparel', 2, 2, null);
insert into user_purchases (purchase_id, title, price, category, itemId, userId, programId) values (3, 'at nibh', '$2.63', 'Apparel', 3, 3, null);

insert into user_purchases (purchase_id, title, price, category, itemId, userId, programId) values (4, 'in', '$8.22', 'Programs', null, 4, 1);
insert into user_purchases (purchase_id, title, price, category, itemId, userId, programId) values (5, 'pede', '$2.05', 'Programs', null, 5, 2);
insert into user_purchases (purchase_id, title, price, category, itemId, userId, programId) values (6, 'tristique', '$5.39', 'Programs', null, 1, 3);

SELECT setval('user_purchases_purchase_id_seq', max(purchase_id)) FROM user_purchases;


/* user_reviews */
insert into user_reviews (review_id, content, rating, itemId, programId, userId, date_created) values (1, 'Comfortable!', 5, 5, null, 1, '11/11/2020');
insert into user_reviews (review_id, content, rating, itemId, programId, userId, date_created) values (2, 'Not comfortable at all!', 3, 4, null, 2, '11/11/2020');
insert into user_reviews (review_id, content, rating, itemId, programId, userId, date_created) values (3, 'Awesome!', 5, 6, null, 3, '11/11/2020');

insert into user_reviews (review_id, content, rating, itemId, programId, userId, date_created) values (4, 'In love!', 5, null, 3, 4, '11/11/2020');
insert into user_reviews (review_id, content, rating, itemId, programId, userId, date_created) values (5, 'My daughter loved it!', 4, null, 5, 5, '11/11/2020');
insert into user_reviews (review_id, content, rating, itemId, programId, userId, date_created) values (6, 'I hated it', 1, null, 10, 1, '11/11/2020');

SELECT setval('user_reviews_review_id_seq', max(review_id)) FROM user_reviews;


/* saes_promos */
insert into saes_promos (promo_id, content, date_created) values (1, 'Booty Bootcamp is available for 30% off from December 1st until January 1st!', '11/25/2020');
insert into saes_promos (promo_id, content, date_created) values (2, 'Ab Shredder is available for 50% off tomorrow only for our 4th of July sale!', '7/03/2021');

SELECT setval('saes_promos_promo_id_seq', max(promo_id)) FROM saes_promos;


/* saes_articles */
insert into saes_articles (article_id, content, date_created) values (1, 'Today we roll out a new program called, "Ab Shredder"! This program will be available for only $70! Come get it while its hot!', '11/11/2020');

SELECT setval('saes_aritcles_article_id_seq', max(article_id)) FROM saes_articles;


/* saes_testimonies */
insert into saes_testimonies (testimony_id, photo, content, date_created) values (1, 'https://c.files.bbci.co.uk/D6E6/production/_109241055_mediaitem109241054.jpg', 'I had a great time working with Sarah Phelps! She is amazing! I lost 30lbs on her program!', '2/01/20');
insert into saes_testimonies (testimony_id, photo, content, date_created) values (2, 'https://c.files.bbci.co.uk/D6E6/production/_109241055_mediaitem109241054.jpg', 'Sarah is great! I gained 30lbs of muscle in 4 months on her program!', '2/01/20');
insert into saes_testimonies (testimony_id, photo, content, date_created) values (3, 'https://c.files.bbci.co.uk/D6E6/production/_109241055_mediaitem109241054.jpg', 'I went from 250lbs to 180lbs with Sarahs custom program!', '2/01/20');

SELECT setval('saes_testimonies_testimony_id_seq', max(testimony_id)) FROM saes_testimonies;


COMMIT;