using CreditBoss.Extensions;

var builder = WebApplication.CreateBuilder(args);
builder.Services.ConfigureCors();
builder.Services.ConfigureSqlServer(builder.Configuration);
builder.Services.AddControllers();
builder.Services.ConfigureSwagger();
builder.Services.ConfigureDependencyServices();
builder.Services.ConfigureAuthentication(builder.Configuration);

var app = builder.Build();
app.ApplyMigrations();
app.UseSwagger();
app.UseSwaggerUI();
app.UseHttpsRedirection();
app.UseCors(options => 
    options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();
