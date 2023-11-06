using Cafihsa.Dto;

namespace Cafihsa.Interfaces;

public interface IClientService
{
    Task<ClientDto> GetByIdAsync(int id);
    Task<List<ClientDto>> GetAllAsync(string? query, string? status);
    Task<ClientStatsDto> GetClientStatsAsync();
    Task Create(ClientDto clientDto);
    Task<List<ListDto>> GetAllAsListAsync(string? query);
}