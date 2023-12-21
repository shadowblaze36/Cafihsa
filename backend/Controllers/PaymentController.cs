using Cafihsa.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Cafihsa.Controllers;

[ApiController]
[Route("api/[controller]")]

public class PaymentController : ControllerBase
{
    private readonly IPaymentService _paymentService;

    public PaymentController(IPaymentService paymentService)
    {
        _paymentService = paymentService;
    }
    
    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery]string? query )
    {
        var payments = await _paymentService.GetAllAsync(query);
        return Ok(payments);
    }
    
}