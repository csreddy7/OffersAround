#!/bin/bash

echo  "
       ******************************************
       *                                        *
       *        Installing the packages         *
       *                                        *
       ******************************************"

npm  install 

gnome-terminal -x sh -c "./scripts/build.sh; bash"

gnome-terminal -x sh -c "./scripts/mongo.sh; bash"

gnome-terminal -x sh -c "./scripts/server.sh; bash"

