#!/usr/bin/env bash


mvn org.apache.maven.plugins:maven-install-plugin:3.0.0-M1:install-file \
-Dfile=lundegaard-commons-2.1.0.pom \
-DgroupId=eu.lundegaard.commons \
-DartifactId=lundegaard-commons \
-Dversion=2.1.0 \
-Dpackaging=pom

mvn org.apache.maven.plugins:maven-install-plugin:3.0.0-M1:install-file \
-Dfile=lundegaard-commons-jackson-2.1.0.jar \
-DgroupId=eu.lundegaard.commons \
-DartifactId=lundegaard-commons-jackson \
-Dversion=2.1.0 \
-Dpackaging=jar

mvn org.apache.maven.plugins:maven-install-plugin:3.0.0-M1:install-file \
-Dfile=lundegaard-commons-util-2.1.0.jar \
-DgroupId=eu.lundegaard.commons \
-DartifactId=lundegaard-commons-util \
-Dversion=2.1.0 \
-DgeneratePom=false \
-Dpackaging=jar
