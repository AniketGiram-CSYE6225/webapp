#!/bin/bash

# installing Ops Agent
cd /var/log

sudo mkdir webapp

cd webapp

sudo curl -sSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh

sudo bash add-google-cloud-ops-agent-repo.sh --also-install

# move logging yml
sudo mv /opt/webapp/config.yaml /etc/google-cloud-ops-agent/config.yaml

sudo systemctl restart google-cloud-ops-agent

echo "completed all steps in ops-agent-init.sh"
