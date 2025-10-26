FROM  eclipse-temurin:17
WORKDIR /app
COPY target/comment-service-*.jar comment-service.jar
EXPOSE 8092
ENTRYPOINT ["java", "-jar", "comment-service.jar"]