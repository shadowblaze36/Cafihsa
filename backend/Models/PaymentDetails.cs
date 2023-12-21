using Cafihsa.Enums;

namespace Cafihsa.Models;

public class PaymentDetails
{
    public int Id { get; set; }
    public int PaymentId { get; set; }
    public ChargeType ChargeType { get; set; }
    public decimal Amount { get; set; }
    public bool IsForgiven { get; set; }
}