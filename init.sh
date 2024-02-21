#!/bin/bash

# Creating user group
sudo groupadd csye6225

# Creating user with a home directory
sudo useradd -s /usr/sbin/nologin -g csye6225 csye6225

echo "User added to group"

sudo yum install unzip -y

unzip /tmp/webapp.zip -d /tmp/webapp

sudo dnf module install nodejs:20 -y

sudo dnf install mysql-server -y

sudo systemctl start mysqld.service

sudo systemctl enable mysqld.service

echo "mysql service status"

sudo systemctl status mysqld.service

sudo mysql < "/tmp/webapp/db.sql"

# move webapp from tmp to opt
sudo mv /tmp/webapp /opt/

# sudo mv /tmp/.env /opt/webapp/

sudo chown -R csye6225:csye6225 /opt/webapp

# move service file to /etc/systemd/system
sudo mv /opt/webapp/csye6225.service /etc/systemd/system/

sudo chown -R csye6225:csye6225 /etc/systemd/system/csye6225.service

cd /opt/webapp

sudo npm install

# starting systemd
sudo systemctl daemon-reload

sudo systemctl enable csye6225.service

sudo systemctl start csye6225.service

sudo systemctl status csye6225.service

echo "completed all steps"
