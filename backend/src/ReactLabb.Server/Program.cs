using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using ReactLabb.DataContext;
using ReactLabb.Domain.Models;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("ScrapContext") ?? "Data Source=scrap.db";

builder.Services.AddDbContext<ScrapContext>(options => options.UseSqlServer(connectionString));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Scrap API", Description = "Scrap times", Version = "v1"});
});

var myPolicy = "MyPolicy";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: myPolicy,
        builder =>
        {
            //builder.WithOrigins("", "*");
            builder.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Scrap API V1");
});

app.UseCors(myPolicy);

app.MapGet("/", () => "Hello World!");

app.MapGet("/scrap", async (ScrapContext db) => await db.Scrap.ToListAsync());

app.MapPost("/scrap", async (ScrapContext db, ScrapModel scrap) =>
{
    await db.Scrap.AddAsync(scrap);
    await db.SaveChangesAsync();
    return Results.Created($"/scrap/{scrap.Id}", scrap);
});

app.MapPut("/scrap/{id}", async (ScrapContext db, ScrapModel updateScrap, int id) =>
{
    var scrapItem = await db.Scrap.FindAsync(id);
    if (scrapItem is null) return Results.NotFound();

    scrapItem.Name = updateScrap.Name;
    scrapItem.Description = updateScrap.Description;

    //db.Scrap.Update(scrapItem);

    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.MapDelete("/scrap/{id}", async (ScrapContext db, int id) =>
{
    var deleteScrap = await db.Scrap.FindAsync(id);
    
    if (deleteScrap is null)
    {
        return Results.NotFound();
    }

    db.Scrap.Remove(deleteScrap);
    await db.SaveChangesAsync();

    return Results.Ok();
});

app.Run();
