using Cafihsa.Dto;

namespace Cafihsa.Interfaces;

public interface ICreditService
{
    Task<List<CreditDto>> GetAllAsync(string? query, string? status);
}