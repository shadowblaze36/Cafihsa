using Cafihsa.Models;
using Microsoft.EntityFrameworkCore;

namespace Cafihsa.Data;

public class CafihsaContext : DbContext {
    
    public CafihsaContext(DbContextOptions<CafihsaContext> options) : base(options) { }
    
    public DbSet<Client> Client { get; set; }
    public DbSet<Credit> Credit { get; set; }
    public DbSet<PaymentPlan> PaymentPlan { get; set; }
    public DbSet<Payment> Payment { get; set; }
    public DbSet<User> User { get; set; }
    public DbSet<References> References { get; set; }
    public DbSet<WorkDetails> WorkDetails { get; set; }

}