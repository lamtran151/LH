FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

WORKDIR /src
COPY ["src/LH.Web.Host/LH.Web.Host.csproj", "src/LH.Web.Host/"]
COPY ["src/LH.Web.Core/LH.Web.Core.csproj", "src/LH.Web.Core/"]
COPY ["src/LH.Application/LH.Application.csproj", "src/LH.Application/"]
COPY ["src/LH.Core/LH.Core.csproj", "src/LH.Core/"]
COPY ["src/LH.EntityFrameworkCore/LH.EntityFrameworkCore.csproj", "src/LH.EntityFrameworkCore/"]
WORKDIR "/src/src/LH.Web.Host"
RUN dotnet restore 

WORKDIR /src
COPY ["src/LH.Web.Host", "src/LH.Web.Host"]
COPY ["src/LH.Web.Core", "src/LH.Web.Core"]
COPY ["src/LH.Application", "src/LH.Application"]
COPY ["src/LH.Core", "src/LH.Core"]
COPY ["src/LH.EntityFrameworkCore", "src/LH.EntityFrameworkCore"]
WORKDIR "/src/src/LH.Web.Host"
RUN dotnet publish -c Release -o /publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:7.0
EXPOSE 80
WORKDIR /app
COPY --from=build /publish .
ENTRYPOINT ["dotnet", "LH.Web.Host.dll"]
