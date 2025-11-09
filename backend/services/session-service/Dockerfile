FROM eclipse-temurin:17

WORKDIR /app

COPY target/session-service-*.jar session-service.jar
EXPOSE 8088
ENTRYPOINT ["java", "-jar", "session-service.jar"]