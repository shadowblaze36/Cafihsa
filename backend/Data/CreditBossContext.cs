using CreditBoss.Models;
using Microsoft.EntityFrameworkCore;

namespace CreditBoss.Data;

public class CreditBossContext : DbContext {
    
    public CreditBossContext(DbContextOptions<CreditBossContext> options) : base(options) { }
    
    public DbSet<Client> Client { get; set; }
    public DbSet<Credit> Credit { get; set; }
    public DbSet<PaymentPlan> PaymentPlan { get; set; }
    public DbSet<Payment> Payment { get; set; }
    public DbSet<User> User { get; set; }
    public DbSet<References> References { get; set; }
    public DbSet<WorkDetails> WorkDetails { get; set; }

}