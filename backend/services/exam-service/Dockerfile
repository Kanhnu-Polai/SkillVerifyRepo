FROM eclipse-temurin:17


LABEL maintainer="kanhnupolai79@gmail.com"

WORKDIR /app


COPY target/exam-service-0.0.1-SNAPSHOT.jar /app/examservice.jar
EXPOSE 8084

ENTRYPOINT [ "java", "-jar", "examservice.jar" ]