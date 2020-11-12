BEGIN;

TRUNCATE 
    saes_testimonies,
    saes_news,
    saes_promos,
    user_reviews,
    user_purchases,
    saes_users,   
    saes_items,
    saes_programs
    RESTART IDENTITY CASCADE;

/* saes_users */


insert into saes_users (id, photo, name, user_name, password, email, address, state, zip, isAdmin) values (1, 'http://dummyimage.com/130x147.png/dddddd/000000', 'Maryanne Errey', 'merrey0', 'uizTm0G59', 'merrey0@jiathis.com', '3 Hazelcrest Street', 'TX', '78769', false);
insert into saes_users (id, photo, name, user_name, password, email, address, state, zip, isAdmin) values (2, 'http://dummyimage.com/220x216.png/ff4444/ffffff', 'Aidan Severn', 'asevern1', 'kbFImsPk', 'asevern1@yolasite.com', '9676 1st Hill', 'NE', '68124', false);
insert into saes_users (id, photo, name, user_name, password, email, address, state, zip, isAdmin) values (3, 'http://dummyimage.com/249x185.bmp/ff4444/ffffff', 'Ruth Deacon', 'rdeacon2', 'Yq6Z0O6xl3', 'rdeacon2@jugem.jp', '34210 Wayridge Road', 'MA', '01152', false);
insert into saes_users (id, photo, name, user_name, password, email, address, state, zip, isAdmin) values (4, 'http://dummyimage.com/197x100.bmp/5fa2dd/ffffff', 'Udale Smellie', 'usmellie3', 'BfWCwdlNGH3', 'usmellie3@cargocollective.com', '82285 7th Parkway', 'WV', '25356', false);
insert into saes_users (id, photo, name, user_name, password, email, address, state, zip, isAdmin) values (5, 'http://dummyimage.com/120x139.png/ff4444/ffffff', 'Vinnie Crowest', 'vcrowest4', 'P2lOXJ5zM', 'vcrowest4@about.me', '5248 Londonderry Crossing', 'GA', '30328', false);
insert into saes_users (id, photo, name, user_name, password, email, address, state, zip, isAdmin) values (6, 'http://dummyimage.com/157x145.bmp/ff4444/ffffff', 'Nelle Hasser', 'nhasser5', '82daRxrhCDb', 'nhasser5@cornell.edu', '7 Dapin Plaza', 'IL', '62718', false);
insert into saes_users (id, photo, name, user_name, password, email, address, state, zip, isAdmin) values (7, 'http://dummyimage.com/121x187.png/ff4444/ffffff', 'Antin Matzke', 'amatzke6', '7YoWfQZ', 'amatzke6@census.gov', '9 Forest Run Parkway', 'PA', '19120', false);
insert into saes_users (id, photo, name, user_name, password, email, address, state, zip, isAdmin) values (8, 'http://dummyimage.com/178x210.bmp/dddddd/000000', 'Annamarie Rolph', 'arolph7', 'DsvvQe2R', 'arolph7@ft.com', '78 Cascade Circle', 'CA', '92835', false);
insert into saes_users (id, photo, name, user_name, password, email, address, state, zip, isAdmin) values (9, 'http://dummyimage.com/102x163.png/cc0000/ffffff', 'Tiebout Kingsford', 'tkingsford8', 'rdoYjaLAF', 'tkingsford8@deliciousdays.com', '56 Ohio Plaza', 'NM', '87190', false);
insert into saes_users (id, photo, name, user_name, password, email, address, state, zip, isAdmin) values (10, 'http://dummyimage.com/162x111.png/5fa2dd/ffffff', 'Delila Kattenhorn', 'dkattenhorn9', 'u0IhStMfEZUk', 'dkattenhorn9@acquirethisname.com', '53 Sutherland Junction', 'TX', '78405', false);
insert into saes_users (id, photo, name, user_name, password, email, address, state, zip, isAdmin) values (11, 'http://dummyimage.com/111x143.jpg/dddddd/000000', 'Lorita Hughman', 'lhughmana', 'eDbwPaDwj', 'lhughmana@umn.edu', '25984 6th Trail', 'FL', '32123', false);
insert into saes_users (id, photo, name, user_name, password, email, address, state, zip, isAdmin) values (12, 'http://dummyimage.com/100x133.jpg/5fa2dd/ffffff', 'Shelden Tippler', 'stipplerb', 'nF1t7hI', 'stipplerb@spiegel.de', '75446 Cambridge Circle', 'VA', '22225', false);
insert into saes_users (id, photo, name, user_name, password, email, address, state, zip, isAdmin) values (13, 'http://dummyimage.com/101x103.bmp/dddddd/000000', 'Kirsten Tregiddo', 'ktregiddoc', 'L1iwDz', 'ktregiddoc@china.com.cn', '6 Valley Edge Hill', 'WA', '98121', false);
insert into saes_users (id, photo, name, user_name, password, email, address, state, zip, isAdmin) values (14, 'http://dummyimage.com/214x135.jpg/5fa2dd/ffffff', 'Uriah Yakolev', 'uyakolevd', 'bB0f6O6Oqu', 'uyakolevd@senate.gov', '0321 Moland Junction', 'CA', '95173', false);
insert into saes_users (id, photo, name, user_name, password, email, address, state, zip, isAdmin) values (15, 'http://dummyimage.com/158x114.jpg/5fa2dd/ffffff', 'Rana Greet', 'rgreete', 'TfdKFbg64NvD', 'rgreete@csmonitor.com', '9522 Marcy Drive', 'TX', '78470', false);
insert into saes_users (id, photo, name, user_name, password, email, address, state, zip, isAdmin) values (16, 'http://dummyimage.com/240x197.png/dddddd/000000', 'Arlie Snookes', 'asnookesf', 'ipGG2DmZjK', 'asnookesf@dmoz.org', '9946 Blaine Park', 'MI', '48098', false);
insert into saes_users (id, photo, name, user_name, password, email, address, state, zip, isAdmin) values (17, 'http://dummyimage.com/164x139.bmp/5fa2dd/ffffff', 'Virginia Kissell', 'vkissellg', 'jG08fA3C', 'vkissellg@soup.io', '0 Blackbird Plaza', 'IL', '60193', false);
insert into saes_users (id, photo, name, user_name, password, email, address, state, zip, isAdmin) values (18, 'http://dummyimage.com/230x232.bmp/cc0000/ffffff', 'Kathie Gaymer', 'kgaymerh', 'AVbo8yWxzyjn', 'kgaymerh@telegraph.co.uk', '2 Ilene Terrace', 'LA', '71161', false);
insert into saes_users (id, photo, name, user_name, password, email, address, state, zip, isAdmin) values (19, 'http://dummyimage.com/166x237.bmp/ff4444/ffffff', 'Petr Pulley', 'ppulleyi', '0y3t8FBRG', 'ppulleyi@marriott.com', '19305 Havey Center', 'AZ', '85311', false);
insert into saes_users (id, photo, name, user_name, password, email, address, state, zip, isAdmin) values (20, 'http://dummyimage.com/159x173.png/5fa2dd/ffffff', 'Brett Haldon', 'bhaldonj', 'IR0tktEAE', 'bhaldonj@livejournal.com', '6112 Waubesa Junction', 'PA', '17405', false);
insert into saes_users (id, photo, name, user_name, password, email, address, state, zip, isAdmin) values (21, 'http://dummyimage.com/101x193.png/ff4444/ffffff', 'Aundrea Boosey', 'abooseyk', 'sPsAw7ZueoU', 'abooseyk@ezinearticles.com', '06821 Village Plaza', 'MS', '39216', false);
insert into saes_users (id, photo, name, user_name, password, email, address, state, zip, isAdmin) values (22, 'http://dummyimage.com/175x198.jpg/ff4444/ffffff', 'Rebekah Kinder', 'rkinderl', 'mip4S5', 'rkinderl@marriott.com', '2 Forest Way', 'PA', '15235', false);
insert into saes_users (id, photo, name, user_name, password, email, address, state, zip, isAdmin) values (23, 'http://dummyimage.com/202x139.bmp/dddddd/000000', 'Derby Gorman', 'dgormanm', 'aHj6F2dzhldk', 'dgormanm@nhs.uk', '27742 Lyons Center', 'TX', '79605', false);
insert into saes_users (id, photo, name, user_name, password, email, address, state, zip, isAdmin) values (24, 'http://dummyimage.com/124x183.jpg/ff4444/ffffff', 'Kara-lynn Hart', 'khartn', 'ICN4KzRgrpPf', 'khartn@w3.org', '41 Springview Hill', 'AZ', '85020', false);
insert into saes_users (id, photo, name, user_name, password, email, address, state, zip, isAdmin) values (25, 'http://dummyimage.com/100x225.jpg/dddddd/000000', 'Bunni Blackborn', 'bblackborno', 'A6TofEXu', 'bblackborno@merriam-webster.com', '440 Bunker Hill Park', 'CO', '80045', false);

/* saes_items */

insert into saes_items (id, title, price, category, description, date_created) values (1, 'quis turpis', '$4.64', 'Apparel', 'Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.', '9/16/2020');
insert into saes_items (id, title, price, category, description, date_created) values (2, 'ante vestibulum', '$3.29', 'Apparel', 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque. Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.', '4/29/2020');
insert into saes_items (id, title, price, category, description, date_created) values (3, 'at nibh', '$2.63', 'Apparel', 'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue.', '3/20/2020');
insert into saes_items (id, title, price, category, description, date_created) values (4, 'turpis enim', '$1.27', 'Apparel', 'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy.', '7/8/2020');
insert into saes_items (id, title, price, category, description, date_created) values (5, 'primis in', '$1.15', 'Apparel', 'Donec posuere metus vitae ipsum. Aliquam non mauris. Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.', '3/2/2020');
insert into saes_items (id, title, price, category, description, date_created) values (6, 'congue etiam', '$7.99', 'Apparel', 'Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat. Nulla nisl. Nunc nisl.', '6/26/2020');
insert into saes_items (id, title, price, category, description, date_created) values (7, 'platea dictumst', '$2.70', 'Apparel', 'Quisque ut erat.', '10/27/2020');
insert into saes_items (id, title, price, category, description, date_created) values (8, 'lectus pellentesque', '$2.41', 'Apparel', 'Pellentesque ultrices mattis odio. Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.', '6/14/2020');
insert into saes_items (id, title, price, category, description, date_created) values (9, 'in porttitor', '$4.94', 'Apparel', 'Nulla facilisi.', '4/2/2020');
insert into saes_items (id, title, price, category, description, date_created) values (10, 'mattis odio', '$3.98', 'Apparel', 'Nunc rhoncus dui vel sem. Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci.', '6/13/2020');
insert into saes_items (id, title, price, category, description, date_created) values (11, 'sed tincidunt', '$7.24', 'Apparel', 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo.', '8/13/2020');
insert into saes_items (id, title, price, category, description, date_created) values (12, 'eu sapien', '$8.00', 'Apparel', 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis.', '3/7/2020');
insert into saes_items (id, title, price, category, description, date_created) values (13, 'at turpis', '$9.37', 'Apparel', 'Praesent blandit lacinia erat.', '5/10/2020');
insert into saes_items (id, title, price, category, description, date_created) values (14, 'nulla facilisi', '$0.82', 'Apparel', 'Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio.', '1/24/2020');
insert into saes_items (id, title, price, category, description, date_created) values (15, 'nulla tellus', '$5.86', 'Apparel', 'Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum.', '8/8/2020');
insert into saes_items (id, title, price, category, description, date_created) values (16, 'curabitur at', '$5.64', 'Apparel', 'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl.', '7/30/2020');
insert into saes_items (id, title, price, category, description, date_created) values (17, 'sed vel', '$4.80', 'Apparel', 'Curabitur convallis.', '5/5/2020');
insert into saes_items (id, title, price, category, description, date_created) values (18, 'mauris lacinia', '$4.03', 'Apparel', 'Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc.', '8/6/2020');
insert into saes_items (id, title, price, category, description, date_created) values (19, 'ut suscipit', '$5.66', 'Apparel', 'Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.', '11/22/2019');

/* saes_programs */

insert into saes_programs (id, title, price, description, date_created) values (1, 'in', '$8.22', 'Suspendisse potenti. In eleifend quam a odio.', '5/13/2020');
insert into saes_programs (id, title, price, description, date_created) values (2, 'pede', '$2.05', 'Pellentesque at nulla. Suspendisse potenti.', '3/30/2020');
insert into saes_programs (id, title, price, description, date_created) values (3, 'tristique', '$5.39', 'Suspendisse potenti. In eleifend quam a odio.', '6/18/2020');
insert into saes_programs (id, title, price, description, date_created) values (4, 'curae', '$8.79', 'Mauris ullamcorper purus sit amet nulla.', '9/21/2020');
insert into saes_programs (id, title, price, description, date_created) values (5, 'nisi', '$6.27', 'Morbi non quam nec dui luctus rutrum. Nulla tellus.', '1/15/2020');
insert into saes_programs (id, title, price, description, date_created) values (6, 'integer', '$1.46', 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo.', '8/29/2020');
insert into saes_programs (id, title, price, description, date_created) values (7, 'nascetur', '$0.35', 'Maecenas tincidunt lacus at velit.', '10/13/2020');
insert into saes_programs (id, title, price, description, date_created) values (8, 'eget', '$11.15', 'Nullam molestie nibh in lectus. Pellentesque at nulla.', '4/3/2020');
insert into saes_programs (id, title, price, description, date_created) values (9, 'quam', '$12.30', 'Nulla nisl.', '3/1/2020');
insert into saes_programs (id, title, price, description, date_created) values (10, 'platea', '$6.57', 'Aenean lectus. Pellentesque eget nunc.', '1/10/2020');
insert into saes_programs (id, title, price, description, date_created) values (11, 'amet', '$1.06', 'Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.', '7/11/2020');
insert into saes_programs (id, title, price, description, date_created) values (12, 'vivamus', '$13.89', 'Maecenas rhoncus aliquam lacus.', '1/30/2020');
insert into saes_programs (id, title, price, description, date_created) values (13, 'pede', '$7.04', 'In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat.', '7/8/2020');
insert into saes_programs (id, title, price, description, date_created) values (14, 'nullam', '$5.28', 'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus.', '5/10/2020');
insert into saes_programs (id, title, price, description, date_created) values (15, 'ipsum', '$5.85', 'Etiam pretium iaculis justo.', '3/18/2020');
insert into saes_programs (id, title, price, description, date_created) values (16, 'at', '$12.10', 'Vivamus in felis eu sapien cursus vestibulum.', '7/17/2020');
insert into saes_programs (id, title, price, description, date_created) values (17, 'id', '$4.67', 'Nullam varius. Nulla facilisi.', '3/17/2020');
insert into saes_programs (id, title, price, description, date_created) values (18, 'sapien', '$7.71', 'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.', '2/1/2020');
insert into saes_programs (id, title, price, description, date_created) values (19, 'praesent', '$11.04', 'Donec quis orci eget orci vehicula condimentum.', '3/3/2020');

/* user_purchases */

insert into user_purchases (id, title, price, category, itemId, userId, programId) values (1, 'quis turpis', '$4.64', 'Apparel', 1, 7, null);
insert into user_purchases (id, title, price, category, itemId, userId, programId) values (2, 'ante vestibulum', '$3.29', 'Apparel', 2, 9, null);
insert into user_purchases (id, title, price, category, itemId, userId, programId) values (3, 'at nibh', '$2.63', 'Apparel', 3, 21, null);

insert into user_purchases (id, title, price, category, itemId, userId, programId) values (4, 'in', '$8.22', 'Programs', null, 20, 1);
insert into user_purchases (id, title, price, category, itemId, userId, programId) values (5, 'pede', '$2.05', 'Programs', null, 21, 2);
insert into user_purchases (id, title, price, category, itemId, userId, programId) values (6, 'tristique', '$5.39', 'Programs', null, 1, 3);

/* user_reviews */
insert into user_reviews (id, content, rating, itemId, programId, userId, date_created) values (1, 'Comfortable!', 5, 5, null, 6, '11/11/2020');
insert into user_reviews (id, content, rating, itemId, programId, userId, date_created) values (2, 'Not comfortable at all!', 3, 4, null, 5, '11/11/2020');
insert into user_reviews (id, content, rating, itemId, programId, userId, date_created) values (3, 'Awesome!', 5, 6, null, 4, '11/11/2020');

insert into user_reviews (id, content, rating, itemId, programId, userId, date_created) values (4, 'In love!', 5, null, 3, 3, '11/11/2020');
insert into user_reviews (id, content, rating, itemId, programId, userId, date_created) values (5, 'My daughter loved it!', 4, null, 5, 2, '11/11/2020');
insert into user_reviews (id, content, rating, itemId, programId, userId, date_created) values (6, 'I hated it', 1, null, 10, 1, '11/11/2020');

/* saes_promos */
insert into saes_promos (id, content, date_created) values (1, 'Booty Bootcamp is available for 30% off from December 1st until January 1st!', '11/25/2020');
insert into saes_promos (id, content, date_created) values (2, 'Ab Shredder is available for 50% off tomorrow only for our 4th of July sale!', '7/03/2021');



/* saes_news */
insert into saes_news (id, content, date_created) values (1, 'Today we roll out a new program called, "Ab Shredder"! This program will be available for only $70! Come get it while its hot!', '11/11/2020');


/* saes_testimonies */
insert into saes_testimonies (id, photo, content, date_created) values (1, 'https://c.files.bbci.co.uk/D6E6/production/_109241055_mediaitem109241054.jpg', 'I had a great time working with Sarah Phelps! She is amazing! I lost 30lbs on her program!', '2/01/20');
insert into saes_testimonies (id, photo, content, date_created) values (2, 'https://c.files.bbci.co.uk/D6E6/production/_109241055_mediaitem109241054.jpg', 'Sarah is great! I gained 30lbs of muscle in 4 months on her program!', '2/01/20');
insert into saes_testimonies (id, photo, content, date_created) values (3, 'https://c.files.bbci.co.uk/D6E6/production/_109241055_mediaitem109241054.jpg', 'I went from 250lbs to 180lbs with Sarahs custom program!', '2/01/20');

COMMIT;