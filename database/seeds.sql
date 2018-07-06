INSERT INTO Categories (name,createdAt,updatedAt) values ("Restaurant",now(),now()),("Places",now(),now()),("Shopping",now(),now());
-- ADMIN
INSERT INTO users (email,username,password,userrole,createdAt,updatedAt) 
values ("admin@askalocal.com","admin","7656053a9961dd9a31f457e5220f587a:1e0a360465838742c8b565a9ae168332","ADMIN",now(),now());

-- admin username: admin
-- admin decrypted password: admin