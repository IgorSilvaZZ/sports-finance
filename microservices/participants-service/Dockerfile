FROM openjdk:21-jdk-slim
ARG JAR_FILE=participants-service/target/*.jar
COPY ${JAR_FILE} app.jar
RUN bash -c 'touch /app.jar'
ENTRYPOINT ["java", "-Djava.sercurity.egd=file:/dev/./urandom", "-jar", "/app.jar"]