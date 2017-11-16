#!/bin/bash
echo "provide some server configuration to build web app"

echo -e "Enter the server ip"
read server_ip

echo -e "Enter the port number on which http server to run"
read http_port

echo -e "Enter the mongo server ip"
read mongo_server_ip

echo -e "Enter the mongo server port"
read mongo_port

echo -e "Enter the database name"
read database

rm -rf config

mkdir config

cd config

touch config.json

echo 
      '{
          "http_server":$server_ip,
          "http_port":$http_port,
          "mongo_server_ip":$mongo_server_ip,
          "mongo_server_port":$mongo_port,
          "database":$database
      }
     ' >> config.json


echo ""

echo  "
       ******************************************
       *                                        *
       *        Building project withwebpack    *
       *                                        *
       ******************************************"

webpack --config ../webpack.config.js



