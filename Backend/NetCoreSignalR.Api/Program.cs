using NetCoreSignalR.Api.Hubs;

var builder = WebApplication.CreateBuilder(args);

var services = builder.Services;
var configuration = builder.Configuration;

services.AddStackExchangeRedisCache(options =>
{
    var connection = configuration.GetConnectionString("Redis");
    options.Configuration = connection;
});

services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy
            .WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

services.AddSignalR();

var app = builder.Build();
app.UseCors();
app.MapHub<ChatHub>("/chat");
app.Run();
