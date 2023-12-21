using Cafihsa.Enums;

namespace Cafihsa.Models;

public class Payment
{
    public int Id { get; set; }
    public int CreditId { get; set; }
    public decimal Amount { get; set; }
    public DateTime PaymentDate { get; set; }
    
    public ICollection<PaymentDetails> PaymentDetails { get; set; } = null!;
    public Credit Credit { get; set; } = null!;
}