#!/bin/bash

echo  "
       ******************************************
       *                                        *
       *        Installing the packages         *
       *                                        *
       ******************************************"

npm  install 

echo ""

echo  "
       ******************************************
       *                                        *
       *        Building project withwebpack    *
       *                                        *
       ******************************************"

webpack --config webpack.config.js

echo ""

echo  "
       ******************************************
       *                                        *
       *        Running the server              *
       *                                        *
       ******************************************"


http-server . -p 7274