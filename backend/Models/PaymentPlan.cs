namespace CreditBoss.Models;

public class PaymentPlan
{
    public int Id { get; set; }
    public int CreditId { get; set; }
    public DateTime PaymentDate { get; set; }
    public decimal Amount { get; set; }
    public decimal Interest { get; set; }
    public decimal Capital { get; set; }

    public Credit Credit { get; set; }
    public ICollection<Payment> Payments {get; set; }
}