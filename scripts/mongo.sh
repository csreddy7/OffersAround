#!/bin/bash

echo  "
       ******************************************
       *                                        *
       *        Installing mongo server         *
       *                                        *
       ******************************************"



sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6

echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list

sudo apt-get update

sudo apt-get install -y mongodb-org

echo ""

echo  "
       ******************************************
       *                                        *
       *        runnnig the mongodb server      *
       *                                        *
       ******************************************"

echo -e "Enter the port number on which mongo server to run"
read mongo_port

echo -e "Enter the database path for mongodb server"
read database_path

echo "thank you! mongo server will run in a moment"

mongod --dbpath=d$database_path --port  $mongo_port
