FROM eclipse-temurin:17


WORKDIR /app


COPY target/userservice-0.0.1-SNAPSHOT.jar /app/user-service.jar
EXPOSE 8083

ENTRYPOINT [ "java", "-jar", "user-service.jar" ]