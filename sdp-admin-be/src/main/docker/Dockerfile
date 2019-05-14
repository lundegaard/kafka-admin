FROM openjdk:11-jdk

RUN apt-get update && \
    apt-get -y --no-install-recommends install graphviz && \
    apt-get clean && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/*

COPY 'maven/sdp-admin-be.jar' '/opt/sdp/sdp-admin-be.jar'
RUN chmod +x /opt/sdp/sdp-admin-be.jar

# 8080 - REST endpoint
EXPOSE 8080

CMD ["java", "-jar", "/opt/sdp/sdp-admin-be.jar"]
