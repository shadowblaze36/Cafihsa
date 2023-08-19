using CreditBoss.Dto;

namespace CreditBoss.Interfaces;

public interface ICreditService
{
    Task<List<CreditDto>> GetAllAsync(string? query, string? status);
}