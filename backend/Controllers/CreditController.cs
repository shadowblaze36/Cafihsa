using CreditBoss.Enums;
using CreditBoss.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CreditBoss.Controllers;

[ApiController]
[Route("api/[controller]")]
//[Authorize]
public class CreditController: ControllerBase
{
    private readonly ICreditService _creditService;
    
    public CreditController(ICreditService creditService)
    {
        _creditService = creditService;
    }
    
    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery]string? query, [FromQuery]string? status)
    {
        var credits = await _creditService.GetAllAsync(query, status);
        return Ok(credits);
    }
    
    [HttpGet("Statuses")]
    public IActionResult GetAll()
    {
        var clientStatuses = Enum.GetNames(typeof(CreditStatus));
        return Ok(clientStatuses);
    }
}