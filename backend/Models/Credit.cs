using Cafihsa.Enums;

namespace Cafihsa.Models;

public class Credit
{
    public int Id { get; set; }
    public int ClientId { get; set; }
    public decimal InitialAmount { get; set; }
    public decimal CurrentAmount { get; set; }
    public decimal InterestRate { get; set; }
    public DateTime StartDate { get; set; }
    public CreditStatus Status { get; set; }

    public Client? Client { get; set; }
    
    public ICollection<Payment>? Payments { get; set; }
}