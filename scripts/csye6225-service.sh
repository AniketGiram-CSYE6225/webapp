#!/bin/bash

# reloading systemd
sudo systemctl daemon-reload

sudo systemctl enable csye6225.service

sudo systemctl start csye6225.service

sudo systemctl status csye6225.service

echo "completed all steps in csye6225-service.sh"
