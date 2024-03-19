#!/bin/bash

# Creating user group
sudo groupadd csye6225

# Creating user with a home directory
sudo useradd -s /usr/sbin/nologin -g csye6225 csye6225

echo "User added to group"

sudo yum install unzip -y

unzip /tmp/webapp.zip -d /tmp/webapp

sudo dnf module install nodejs:20 -y

# move webapp from tmp to opt
sudo mv /tmp/webapp /opt/

# change owner of webapp to csye6225
sudo chown -R csye6225:csye6225 /opt/webapp

# move service file to /etc/systemd/system
sudo mv /opt/webapp/csye6225.service /etc/systemd/system/

# change owner of csye6225.service file to csye6225
sudo chown -R csye6225:csye6225 /etc/systemd/system/csye6225.service

cd /opt/webapp

sudo npm install

# installing Ops Agent
cd /var/log

sudo mkdir webapp

cd webapp

sudo curl -sSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh

sudo bash add-google-cloud-ops-agent-repo.sh --also-install

echo "completed all steps in init.sh"
