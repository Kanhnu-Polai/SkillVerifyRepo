FROM eclipse-temurin:17

WORKDIR /app

COPY target/application-service-*.jar application-service.jar
EXPOSE 8088
ENTRYPOINT ["java", "-jar", "application-service.jar"]