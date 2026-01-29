# Build Stage
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app

# Copy backend source
COPY backend/pom.xml .
COPY backend/src ./src

# Build
RUN mvn clean package -DskipTests

# Run Stage
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
