# Kafka Admin

This is an open source administration web UI for Apache Kafka.


### Quick Start Guide
* Download and install Docker
* Clone this project
* Import all the local dependencies from the folder 'jars'
```bash
cd jars/
./import_jars.sh
```
* Build the modules of the app from the main folder
```bash
mvn clean install
```
* Run the Docker containers (detached) 
```bash
docker-compose up -d
```
* Application as default can be accessed on address 0.0.0.0

