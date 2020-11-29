#!/bin/bash


#sudo amazon-linux-extras install -y java-openjdk11
sudo amazon-linux-extras install -y java-openjdk11
#curl -L -O https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.8.0-linux-x86_64.tar.gz
sudo yum install -y https://dev.mysql.com/get/mysql57-community-release-el7-11.noarch.rpm
sudo yum install -y mysql-community-client
#sudo yum install mysql-devel gcc python-devel -y
sudo yum install mysql-devel gcc python-devel -y
#tar -xvf elasticsearch-7.8.0-linux-x86_64.tar.gz
#cd elasticsearch-7.8.0/bin
#./elasticsearch