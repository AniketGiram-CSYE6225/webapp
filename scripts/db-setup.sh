#!/bin/bash

sudo systemctl enable mysqld.service

sudo systemctl start mysqld.service

echo "mysql service status"

sudo systemctl status mysqld.service

sudo mysql < "/opt/webapp/db.sql"

echo "completed all steps in db-setup.sh"
