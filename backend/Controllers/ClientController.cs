using Cafihsa.Dto;
using Cafihsa.Enums;
using Cafihsa.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Cafihsa.Controllers;

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
    
    [HttpGet("{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetById(int id)
    {
        var client = await _clientService.GetByIdAsync(id);
        return Ok(client);
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

    [HttpGet("List")]
    public async Task<IActionResult> GetList([FromQuery]string? query)
    {
        var stats = await _clientService.GetAllAsListAsync(query);
        return Ok(stats);
    }

}