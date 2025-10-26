FROM eclipse-temurin:17
WORKDIR /app
COPY target/exam-service-*.jar exam-service.jar
EXPOSE 9095
ENTRYPOINT ["java", "-jar", "exam-service.jar"]