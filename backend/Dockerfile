#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.


FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

# Crea el directorio /root/.aspnet/https/ si no existe
RUN mkdir -p /root/.aspnet/https/

# Genera el certificado dentro del contenedor
RUN openssl req -x509 -newkey rsa:4096 -keyout /root/.aspnet/https/cafihsa.key -out /root/.aspnet/https/cafihsa.crt -days 365 -nodes -subj "/CN=localhost"

# Combina el certificado y la clave en un archivo pfx
RUN openssl pkcs12 -export -out /root/.aspnet/https/cafihsa.pfx -inkey /root/.aspnet/https/cafihsa.key -in /root/.aspnet/https/cafihsa.crt -password pass:c@f!hs@

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["Cafihsa.csproj", "."]
RUN dotnet restore "./Cafihsa.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "Cafihsa.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Cafihsa.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Cafihsa.dll"]

EXPOSE 5038
EXPOSE 7030