using System.Globalization;
using CreditBoss.Data;
using CreditBoss.Dto;
using CreditBoss.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CreditBoss.Services;

public class CreditService : ICreditService
{
    private readonly CreditBossContext _db;
    
    public CreditService(CreditBossContext db)
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
    
}