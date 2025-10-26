
FROM eclipse-temurin:17

WORKDIR /app

COPY target/authservice-*.jar auth-service.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "auth-service.jar"]


