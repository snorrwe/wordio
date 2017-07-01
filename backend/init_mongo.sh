#!usr/bin/bash
mongo wordio --eval 'db.createUser({ user: "wordio", pwd: "wordio_pw", roles: ["readWrite"] });'
