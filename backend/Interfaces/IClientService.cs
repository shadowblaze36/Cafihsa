using CreditBoss.Dto;

namespace CreditBoss.Interfaces;

public interface IClientService
{
    Task<List<ClientDto>> GetAllAsync(string? query, string? status);
    Task<ClientStatsDto> GetClientStatsAsync();
    Task Create(ClientDto clientDto);
}