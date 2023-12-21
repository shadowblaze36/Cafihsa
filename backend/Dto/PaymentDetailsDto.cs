using Cafihsa.Enums;

namespace Cafihsa.Dto;

public class PaymentDetailsDto
{
    public int Id { get; set; }
    public ChargeType ChargeType { get; set; }
    public decimal Amount { get; set; }
    public bool IsForgiven { get; set; }
}