namespace CreditBoss.Models;

public class WorkDetails
{
    public int Id { get; set; }
    public int ClientId { get; set; }
    public string? Workplace { get; set; }
    public string? Workphone { get; set; }
    public string? BossName  { get; set; }
    public string? BossPhone  { get; set; }
    public DateTime StartDate { get; set; }
    public string? WorkAddress { get; set; }
}