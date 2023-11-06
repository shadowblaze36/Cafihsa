using System.Globalization;
using Cafihsa.Data;
using Cafihsa.Dto;
using Cafihsa.Enums;
using Cafihsa.Interfaces;
using Cafihsa.Models;
using Microsoft.EntityFrameworkCore;

namespace Cafihsa.Services;

public class CreditService : ICreditService
{
    private readonly CafihsaContext _db;
    
    public CreditService(CafihsaContext db)
    {
        _db = db;
    }
    
    public async Task<List<CreditDto>> GetAllAsync(string? query, string? status)
    {
        var dbCredits = await _db.Credit.Include(c => c.Client).ToListAsync();

        var credits = dbCredits.Select(credit => new CreditDto()
        {
            Id = credit.Id,
            ClientId = credit.ClientId,
            FirstName = credit.Client?.FirstName ?? "",
            LastName = credit.Client?.LastName ?? "",
            Email = credit.Client?.Email ?? "",
            Balance = credit.CurrentAmount,
            StartDate = credit.StartDate,
            Status = credit.Status.ToString()
        }).ToList();

        credits = QueryCredits(credits, query);
        
        if (!string.IsNullOrEmpty(status)) 
        {
            credits = credits.Where(credit => credit.Status == status).ToList();
        }

        return credits;
    }
    
    private static List<CreditDto> QueryCredits(List<CreditDto> queryableCredits, string? query)
    {
        if (!string.IsNullOrEmpty(query))
        {
            queryableCredits = queryableCredits.Where(credit =>
                IsMatch(credit.Id.ToString(), query) ||
                IsMatch(credit.ClientId.ToString(), query) ||
                IsMatch(credit.FirstName, query) ||
                IsMatch(credit.LastName, query) ||
                IsMatch(credit.Email, query) ||
                IsMatch(credit.Balance.ToString(CultureInfo.InvariantCulture), query) ||
                IsMatch(credit.Status, query)
            ).ToList();
        }
        return queryableCredits;
    }
    
    private static bool IsMatch(string? value, string query)
    {
        return value != null && value.Contains(query, StringComparison.OrdinalIgnoreCase);
    }
    
    public async Task Create(NewCreditDto creditDto)
    {
        var credit = new Credit()
        {
            ClientId = creditDto.ClientId,
            InitialAmount = creditDto.Amount,
            CurrentAmount = creditDto.Amount,
            InterestRate = creditDto.InterestRate,
            StartDate = DateTime.Now,
            Status = CreditStatus.Active
        };
        await _db.Credit.AddAsync(credit);
        await _db.SaveChangesAsync();
    }
    
}