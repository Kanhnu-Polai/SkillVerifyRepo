FROM eclipse-temurin:17
WORKDIR /app

COPY target/job-service-*.jar job-service.jar
EXPOSE 8086
ENTRYPOINT ["java", "-jar", "job-service.jar"]