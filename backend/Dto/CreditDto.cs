namespace CreditBoss.Dto;

public class CreditDto
{
    public int Id { get; set; }
    public int ClientId { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Email { get; set; }
    public decimal Balance { get; set; }
    public DateTime StartDate { get; set; }
    public string? Status { get; set; }
}