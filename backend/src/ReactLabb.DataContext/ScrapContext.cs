using Microsoft.EntityFrameworkCore;
using ReactLabb.Domain.Models;

namespace ReactLabb.DataContext;

public class ScrapContext : DbContext
{
    public DbSet<ScrapModel> Scrap { get; set; }

    public ScrapContext(DbContextOptions<ScrapContext> options) : base(options)
    {
        
    }
}
