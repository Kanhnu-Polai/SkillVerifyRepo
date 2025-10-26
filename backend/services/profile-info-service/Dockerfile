FROM eclipse-temurin:17
WORKDIR /app
COPY target/profile-info-service-*.jar profile-info-service.jar
EXPOSE 9093
ENTRYPOINT ["java", "-jar", "profile-info-service.jar"]