# webapp

# Steps to setup the repo for demo.
## scp zip file into digitalocean droplet.
``` bash
scp -i ~/.ssh/id_rsa.pub ./Aniket_Giram_002808219_02.zip USER@SERVER:/home/USER/FILENAME
```

## SSH into VM to start the demo
```bash
ssh -i ~/.ssh/id_rsa.pub root@IP
```


## Create a user for demo purposes.
As we login as root. We can execute  the following commands to create a new user.
```bash
useradd -m -d /home/demo_user -s /bin/bash demo_user
```
Set the password for the newly created user
```bash
passwd demo_user
```
Add the demo user to the sudo group.
```bash
usermod -G wheel -a demo_user
```

Switch user to demo user for the demo using the following commands
```bash
su - demo_user
```



## Install dependencies

## For Node
The following command will be used to install Node on the CentOS vm. It also installs npm for us.
```bash
sudo dnf module install nodejs:20
```

## For MySQL server.
To install mysql-server
```bash
sudo dnf install mysql-server

# To start the server
sudo systemctl start mysqld.service

# Add password for the root user here
sudo mysql_secure_installation

# Drop into mysql console as root.
mysql -u root -p
```
```sql
## Create a database using the following command.
CREATE DATABASE nscc

# Create a new user for the demo.
# set name to what we want and password accordingly
CREATE USER 'user'@'localhost' IDENTIFIED BY 'admin@123';

# Grant the user permissions
GRANT ALL PRIVILEGES ON nscc.* TO 'user'@'localhost' WITH GRANT OPTION;

# Run this to update the grant tables in mysql
FLUSH PRIVILEGES;

```

# Now for the code part.
## Unzip the zip we copied using scp to the server.

```bash
unzip Aniket_Giram_002808219.zip .
```

## change directory into zip

```bash
cd Aniket_Giram_002808219
```
## run the following to install dependencies.
```bash
npm i
```

## Create a .env file at root of the project. With the following keys
```env
DIALECT=
DB_NAME=
DB_USERNAME=
DB_PASSWORD=
PORT=
```

## Run the server using the following command.
```bash
npm start
```
