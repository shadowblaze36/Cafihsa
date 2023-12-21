using System.Globalization;
using Cafihsa.Data;
using Cafihsa.Dto;
using Cafihsa.Interfaces;
using Microsoft.EntityFrameworkCore;
using static Cafihsa.Utils.StringUtils;

namespace Cafihsa.Services;

public class PaymentService : IPaymentService
{
    private readonly CafihsaContext _db;
    
    public PaymentService(CafihsaContext db)
    {
        _db = db;
    }

    public async Task<List<PaymentDto>> GetAllAsync(string? query)
    {
        var dbPayments = await _db.Payment.Include(p => p.Credit).ThenInclude(c=> c.Client).ToListAsync();
        
        var payments = dbPayments.Select(payment => new PaymentDto()
        {
            Id = payment.Id,
            CreditId = payment.CreditId,
            ClientId = payment.Credit.ClientId,
            FirstName = payment.Credit.Client?.FirstName ?? "",
            LastName = payment.Credit.Client?.LastName ?? "",
            Amount = payment.Amount,
            PaymentDate = payment.PaymentDate
            
        }).ToList();
        
        payments = QueryPayments(payments, query);

        return payments;
    }
    
    private static List<PaymentDto> QueryPayments(List<PaymentDto> queryablePayments, string? query)
    {
        if (!string.IsNullOrEmpty(query))
        {
            queryablePayments = queryablePayments.Where(payment =>
                IsMatch(payment.Id.ToString(), query) ||
                IsMatch(payment.ClientId.ToString(), query) ||
                IsMatch(payment.FirstName, query) ||
                IsMatch(payment.LastName, query) ||
                IsMatch(payment.PaymentDate.ToString(CultureInfo.InvariantCulture), query) ||
                IsMatch(payment.Amount.ToString(CultureInfo.InvariantCulture), query) 
            ).ToList();
        }
        return queryablePayments;
    }
    
    public decimal CalculateAmountDue(int creditId)
    {
        var settings = _db.Settings.FirstOrDefault();
        var currentDate = settings is { UseProcessDate: true } ? settings.ProcessDate : DateTime.Now;
        
        var credit = _db.Credit.FirstOrDefault(c => c.Id == creditId);
        if (credit is null)
            return 0;
        
        var payments = _db.Payment.Include(p=> p.PaymentDetails).Where(p => p.CreditId == creditId).ToList();
        
        
        
        decimal totalAmount = 0;

        // // Obtener los pagos realizados hasta la fecha actual
        // var paymentsUntilDate = Payments?.Where(p => p.PaymentDate <= currentDate).ToList();
        //
        // if (paymentsUntilDate != null && paymentsUntilDate.Any())
        // {
        //     foreach (var payment in paymentsUntilDate)
        //     {
        //         // Sumar los montos de cada detalle de pago
        //         totalAmount += payment.PaymentDetails?.Sum(pd => pd.Amount) ?? 0;
        //     }
        // }
        //
        // // Calcular el interés acumulado hasta la fecha actual
        // decimal interest = CalculateAccumulatedInterest(currentDate);
        // totalAmount += interest;
        //
        // // Calcular el capital pendiente
        // decimal principal = CurrentAmount - totalAmount;
        //
        // // Verificar si se deben aplicar cargos por pago atrasado
        // decimal lateFees = CalculateLateFees(currentDate);
        // totalAmount += lateFees;
        //
        // // Asegurarse de que el monto total a pagar no sea negativo
        // totalAmount = Math.Max(totalAmount, 0);

        return totalAmount;
    }
    
    private List<PaymentDetailsDto> CalculateLateFees(int CreditId,  DateTime currentDate)
    {
        // decimal lateFees = 0;
        //
        // // Lógica para calcular los cargos por pago atrasado hasta la fecha actual
        // // Puedes adaptar esto según la lógica específica de tu aplicación
        //
        // return lateFees;
    }
    
}