FROM eclipse-temurin:17.0.17_10-jdk-ubi10-minimal AS build

WORKDIR /app

COPY . .

RUN chmod +x mvnw 

RUN ./mvnw clean package -DskipTests

FROM eclipse-temurin:17.0.17_10-jre-ubi10-minimal

COPY --from=build /app/target/customer-base-0.0.1-SNAPSHOT.jar /app/serv-plat.jar

WORKDIR /app

CMD ["java", "-jar", "serv-plat.jar"]