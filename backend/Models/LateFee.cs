namespace Cafihsa.Models;

public class LateFee
{
    public int Id { get; set; }
    public decimal LowerLimit { get; set; }
    public decimal UpperLimit { get; set; }
    public decimal Fee { get; set; }
}