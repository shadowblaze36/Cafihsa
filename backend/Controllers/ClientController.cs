using CreditBoss.Dto;
using CreditBoss.Enums;
using CreditBoss.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CreditBoss.Controllers;

[ApiController]
[Route("api/[controller]")]
//[Authorize]
public class ClientController : ControllerBase
{
    private readonly IClientService _clientService;

    public ClientController(IClientService clientService)
    {
        _clientService = clientService;
    }
    
    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery]string? query, [FromQuery]string? status)
    {
        var clients = await _clientService.GetAllAsync(query, status);
        return Ok(clients);
    }
    
    [HttpGet("Stats")]
    public async Task<IActionResult> GetStats()
    {
        var stats = await _clientService.GetClientStatsAsync();
        return Ok(stats);
    }
    
    [HttpGet("Statuses")]
    public IActionResult GetAll()
    {
        var clientStatuses = Enum.GetNames(typeof(ClientStatus));
        return Ok(clientStatuses);
    }
    
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] ClientDto client)
    {
        await _clientService.Create(client);
        return Ok();
    }
}