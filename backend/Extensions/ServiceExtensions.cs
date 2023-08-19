using System.Text;
using CreditBoss.Data;
using CreditBoss.Interfaces;
using CreditBoss.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace CreditBoss.Extensions;

public static class ServiceExtensions
{
    public static void ConfigureCors(this IServiceCollection services)
    {
        
        services.AddCors(options =>
        {
            options.AddPolicy("CorsPolicy",
                builder => builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader());
        });
    }
    
    public static void ConfigureSqlServer(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<CreditBossContext>(options =>
            options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"))
        );
    }
    
    public static void ApplyMigrations( this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var services = scope.ServiceProvider;
        var context = services.GetRequiredService<CreditBossContext>();
        if (context.Database.GetPendingMigrations().Any())
        {
            context.Database.Migrate();
        }
    }

    public static void ConfigureSwagger(this IServiceCollection services)
    {
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();
    }

    public static void ConfigureDependencyServices(this IServiceCollection services)
    {
        services.AddScoped<IClientService, ClientService>();
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<ICreditService, CreditService>();
    }
    
    public static void ConfigureAuthentication(this IServiceCollection services, IConfiguration configuration)
    {
        var accesControlIsEnabled = configuration.GetValue<bool>("Configuration:AccessControlIsEnabled");
        services
            .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ClockSkew = TimeSpan.Zero,
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = configuration.GetValue<string>("TokenValidationParameters:ValidIssuer"),
                    ValidAudience = configuration.GetValue<string>("TokenValidationParameters:ValidAudience"),
                    IssuerSigningKey = new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(
                            configuration.GetValue<string>("TokenValidationParameters:IssuerSigningKey") ?? string.Empty)
                    ),
                };
            });
    }
    
}