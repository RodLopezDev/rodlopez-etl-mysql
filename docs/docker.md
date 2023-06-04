docker run --name mysql-container -p 3306 -e MYSQL_ROOT_PASSWORD=12345678 -e MYSQL_DATABASE=mysql -d mysql:latest

docker exec -it MySqlLocal bash

mysql -u root password '12345678'