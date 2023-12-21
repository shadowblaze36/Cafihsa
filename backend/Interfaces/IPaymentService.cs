using Cafihsa.Dto;

namespace Cafihsa.Interfaces;

public interface IPaymentService
{
    Task<List<PaymentDto>> GetAllAsync(string? query);
}