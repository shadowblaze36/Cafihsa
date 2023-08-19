using CreditBoss.Enums;

namespace CreditBoss.Models;

public class User
{
    public int Id { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string PasswordHash { get; set; }
    public string PasswordSalt { get; set; }
    public UserType UserType { get; set; }
    
    public int? ClientId { get; set; }
    public Client? Client { get; set; }
}