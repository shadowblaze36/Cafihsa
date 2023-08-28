using Cafihsa.Dto;

namespace Cafihsa.Interfaces;

public interface IClientService
{
    Task<List<ClientDto>> GetAllAsync(string? query, string? status);
    Task<ClientStatsDto> GetClientStatsAsync();
    Task Create(ClientDto clientDto);
    Task<List<ListDto>> GetAllAsListAsync();
}