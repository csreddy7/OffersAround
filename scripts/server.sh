echo ""

echo  "
       ******************************************
       *                                        *
       *        Running the server              *
       *                                        *
       ******************************************"


echo -e "Enter the port number on which http server to run"
read http_port


http-server . -p $http_port