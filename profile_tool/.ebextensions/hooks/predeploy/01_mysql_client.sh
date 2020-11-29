#!/bin/bash

sudo amazon-linux-extras install -y java-openjdk11
sudo yum install -y https://dev.mysql.com/get/mysql57-community-release-el7-11.noarch.rpm
sudo yum install -y mysql-community-client
sudo yum install mysql-devel gcc python-devel -y
