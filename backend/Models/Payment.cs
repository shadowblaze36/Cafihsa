using CreditBoss.Enums;

namespace CreditBoss.Models;

public class Payment
{
    public int Id { get; set; }
    public int CreditId { get; set; }
    public int PaymentPlanId { get; set; }
    public decimal Amount { get; set; }
    public DateTime PaymentDate { get; set; }
    public PaymentPlan PaymentPlan { get; set; }
}