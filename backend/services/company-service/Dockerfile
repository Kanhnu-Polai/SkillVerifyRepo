FROM eclipse-temurin:17
WORKDIR /app

COPY target/company-service-0.0.1-SNAPSHOT.jar company-service.jar
EXPOSE 9001
ENTRYPOINT ["java","-jar","company-service.jar"]