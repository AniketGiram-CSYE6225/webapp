#!/bin/bash

# installing Ops Agent
cd /var/log

sudo mkdir webapp

cd webapp

sudo curl -sSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh

sudo bash add-google-cloud-ops-agent-repo.sh --also-install

echo "completed all steps in ops-agent-init.sh"
