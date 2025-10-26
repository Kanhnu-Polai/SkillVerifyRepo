FROM eclipse-temurin:17
WORKDIR /app
COPY target/like-service-*.jar like-service.jar
EXPOSE 8091
ENTRYPOINT ["java", "-jar", "like-service.jar"]