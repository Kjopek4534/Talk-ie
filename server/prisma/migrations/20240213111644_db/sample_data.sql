-- User Sample Data
INSERT INTO `User` (username, email, password, createdAt, updatedAt)
VALUES ('Jan', 'jan@gmail.com', '$2a$12$WNUF1RCG09RwPpp9Bq5X0OQEPD0Deu6ugB5pGc5ql/fwXDv0kBMvC', '2022-05-08 12:00:00', '2024-05-08 12:12:00'),
       ('Weronika', 'wera@onet.com', '$2a$12$bIFrjDeUoXVkkZQ.zW4wI.RE9VKNB616w0L3RgmExhVXt50ZJ5Cg.^', '2022-04-07 13:00:00', '2024-05-07 23:59:00'),
       ('Bruno', 'dog@outlook.com', '$2a$12$NYSHxQifOsxIw/ns7kLoLeLYHgbgEUmWUBTI2XTvVqSRUnLF6i/Di', '2022-03-06 13:00:00', '2024-05-08 08:30:00'),
       ('Anastazja', 'anastazja@wp.com', '$2a$12$zpJzuvfrCK8Tu/Y6yNa.7Oil1A0V.ABpJwvXMnRetoC0VBhbhkWbS', '2022-02-08 13:00:00', '2024-05-06 03:47:00'),
       ('Jerzy', 'zjuju11@intel.com', '$2a$12$zZfSj/synnIUcYIzxpKMlOSI51FFOs8PztNQ4SxQ2E9ncO39FLK2m', '2022-01-03 13:00:00', '2024-05-08 10:14:00');

-- Hasła bez bcrypted: 'SikuSikuMocz!1', 'P@ssword^', '#Tatra$m1erdzi', 'Ry$$iu47', 'In#l2137'

-- Group Sample Data
INSERT INTO `Group` (id, name, receiveNotifications, createdAt, updatedAt)
VALUES (1, 'Group 1', true, '2023-12-24 17:00:00', '2024-05-08 12:12:00'),
       (2, 'Group 2', true, '2023-09-01 09:00:00', '2024-05-08 10:14:00');

-- UserGroup Sample Data
INSERT INTO `UserGroup` (userId, groupId)
VALUES (1, 1),
       (2, 1),
       (4, 1),
       (3, 2),
       (4, 2),
       (5, 2);

-- Chat Sample Data
INSERT INTO `Chat` (messageID, receiveNotifications, createdAt, updatedAt)
VALUES (null, true, '2022-12-31 13:01:00', '2022-12-31 13:06:00'),
       (null, true, '2022-10-31 00:01:00', '2022-10-31 00:17:00'),
       (null, true, '2022-12-31 21:01:00', '2022-12-31 21:06:00'),
       (null, true, '2022-11-11 11:11:00', '2022-11-11 11:16:00'),
       (null, true, '2022-09-30 05:48:00', '2022-09-30 05:53:00');

-- UserChat Sample Data
INSERT INTO `UserChat` (userID, chatID)
VALUES (1, 1),
       (2, 1),
       (3, 2),
       (4, 2),
       (5, 3),
       (1, 3),
       (2, 4),
       (3, 4),
       (4, 5),
       (5, 5);

-- Message Sample Data
INSERT INTO `Message` (userID, chatID, groupID, typeID, content, sentAt, deliveredAt, seenAt)
VALUES (1, 1, null, 1, 'My sie wgl znamy', '2022-12-31 13:01:00', '2022-12-31 13:02:00', '2022-12-31 13:03:00'),
       (1, 3, null, 1, 'Tak', '2022-12-31 21:04:00', '2022-12-31 21:05:00', '2022-12-31 21:06:00'),
       (2, 1, null, 1, 'Nie xdddd', '2022-12-31 13:04:00', '2022-12-31 13:05:00', '2022-12-31 13:06:00'),
       (2, 4, null, 1, 'Elo elo 3 2 0', '2022-11-11 11:12:00', '2022-11-11 11:13:00', '2022-11-11 11:14:00'),
       (3, 2, null, 1, 'Dzien Dobry, jest Pani zainteresowana sokowirowka marki Bosh?', '2022-10-31 00:01:00', '2022-10-31 00:02:00', '2022-10-31 00:03:00'),
       (3, 4, null, 1, 'Siatedajta', '2022-11-11 11:14:00', '2022-11-11 11:15:00', '2022-11-11 11:16:00'),
       (4, 2, null, 1, 'Tak, jak najbardziej :D', '2022-10-31 00:15:00', '2022-10-31 00:16:00', '2022-10-31 00:17:00'),
       (4, 5, null, 1, 'Hello', '2022-09-30 05:48:00', '2022-09-30 05:49:00', '2022-09-30 05:50:00'),
       (5, 3, null, 1, 'JJS', '2022-12-31 21:01:00', '2022-12-31 21:02:00', '2022-12-31 21:03:00'),
       (5, 5, null, 1, 'nie...', '2022-09-30 05:51:00','2022-09-30 05:52:00', '2022-09-30 05:53:00'),
       (1, null, 1, 1, 'Haahahaha glejus dostal jedynke z funkcji liniowej', '2024-05-08 12:12:00', null, null),
       (5, null, 2, 1, 'Ej, bo chyba Swiecioch nie zdal z matmy', '2024-05-08 10:14:00', null, null);

-- Type Sample Data
INSERT INTO `Type` (type)
VALUES ('Text');

-- UserSettings Sample Data
INSERT INTO `UserSettings` (userID, receiveNotifications, darkMode, language)
VALUES (1, true, true, 'English'),
       (2, false, true, 'English'),
       (3, true, false, 'Polish'),
       (4, false, false, 'English'),
       (5, true, true, 'Polish');

-- Friendship Sample Data
INSERT INTO `Friendship` (userId, friendUserId, statusID, createdAt, updatedAt)
VALUES (1, 2, 1, '2022-12-31 13:00:00', '2022-12-31 13:00:00'),
       (1, 5, 1, '2022-12-31 21:00:00', '2022-12-31 21:00:00'),
       (2, 1, 1, '2022-12-31 13:00:00', '2022-12-31 13:00:00'),
       (2, 3, 1, '2022-11-11 11:11:00', '2022-11-11 11:11:00'),
       (3, 2, 1, '2022-12-31 00:00:00', '2022-12-31 00:00:00'),
       (3, 4, 1, '2022-11-11 11:11:00', '2022-11-11 11:11:00'),
       (4, 3, 1, '2022-12-31 00:00:00', '2022-12-31 00:00:00'),
       (4, 5, 1, '2022-09-30 05:47:00', '2022-09-30 05:47:00'),
       (5, 1, 1, '2022-12-31 21:00:00', '2022-12-31 21:00:00'),
       (5, 4, 1, '2022-09-30 05:47:00', '2022-09-30 05:47:00');

-- FriendshipStatus Sample Data
INSERT INTO `FriendshipStatus` (status)
VALUES ('Friends'),
       ('No Friends'),
       ('Pending'),
       ('Rejected'),
       ('Blocked');