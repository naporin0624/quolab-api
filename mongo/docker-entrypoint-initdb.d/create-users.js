var users = [{
  user: "user",
  pwd: "password",
  roles: [{
    role: "dbAdmin",
    db: "development"
  }]
}];

for (var i = 0, length = users.length; i < length; ++i) {
  db.createUser(users[i]);
}