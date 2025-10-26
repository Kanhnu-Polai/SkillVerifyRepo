FROM eclipse-temurin:17
WORKDIR /app
COPY target/post-service-*.jar post-service.jar
EXPOSE 9090 
ENTRYPOINT [ "java","-jar","post-service.jar" ]