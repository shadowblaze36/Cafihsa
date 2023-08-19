namespace CreditBoss.Dto;

public class ClientStatsDto
{
    public int TotalClients { get; set; }
    public int PaidClients { get; set; }
    public int LateClients { get; set; }
    public int InactiveClients { get; set; }
}