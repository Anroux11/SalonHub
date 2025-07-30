FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src
COPY ["src/SalonHub.Web.Host/SalonHub.Web.Host.csproj", "src/SalonHub.Web.Host/"]
COPY ["src/SalonHub.Web.Core/SalonHub.Web.Core.csproj", "src/SalonHub.Web.Core/"]
COPY ["src/SalonHub.Application/SalonHub.Application.csproj", "src/SalonHub.Application/"]
COPY ["src/SalonHub.Core/SalonHub.Core.csproj", "src/SalonHub.Core/"]
COPY ["src/SalonHub.EntityFrameworkCore/SalonHub.EntityFrameworkCore.csproj", "src/SalonHub.EntityFrameworkCore/"]
WORKDIR "/src/src/SalonHub.Web.Host"
RUN dotnet restore 

WORKDIR /src
COPY ["src/SalonHub.Web.Host", "src/SalonHub.Web.Host"]
COPY ["src/SalonHub.Web.Core", "src/SalonHub.Web.Core"]
COPY ["src/SalonHub.Application", "src/SalonHub.Application"]
COPY ["src/SalonHub.Core", "src/SalonHub.Core"]
COPY ["src/SalonHub.EntityFrameworkCore", "src/SalonHub.EntityFrameworkCore"]
WORKDIR "/src/src/SalonHub.Web.Host"
RUN dotnet publish -c Release -o /publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:8.0
EXPOSE 80
WORKDIR /app
COPY --from=build /publish .
ENTRYPOINT ["dotnet", "SalonHub.Web.Host.dll"]
