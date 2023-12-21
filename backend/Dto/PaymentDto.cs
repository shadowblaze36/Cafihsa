namespace Cafihsa.Dto;

public class PaymentDto
{
    public int Id { get; set; }
    public int CreditId { get; set; }
    public int ClientId { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public decimal Amount { get; set; }
    public DateTime PaymentDate { get; set; }
    
}