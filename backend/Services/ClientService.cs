using CreditBoss.Data;
using CreditBoss.Dto;
using CreditBoss.Enums;
using CreditBoss.Interfaces;
using CreditBoss.Models;
using Microsoft.EntityFrameworkCore;

namespace CreditBoss.Services;

public class ClientService : IClientService
{
    private readonly CreditBossContext _db;
    
    public ClientService(CreditBossContext db)
    {
        _db = db;
    }

    public async Task<List<ClientDto>> GetAllAsync(string? query, string? status)
    {
        var dbClients = await _db.Client.Include(c => c.Credits).ToListAsync();

        var clients = dbClients.Select(client => new ClientDto
        {
            Id = client.Id,
            FirstName = client.FirstName,
            LastName = client.LastName,
            Email = client.Email,
            Phone = client.Phone,
            Address = client.Address,
            Birthdate = DateOnly.FromDateTime(client.Birthdate),
            IdentificationNumber = client.IdentificationNumber,
            Status = GetClientStatus(client.Credits)
        }).ToList();

        clients = QueryClients(clients, query);
        
        if (!string.IsNullOrEmpty(status)) 
        {
            clients = clients.Where(client => client.Status == status).ToList();
        }

        return clients;
    }

    private static string GetClientStatus(ICollection<Credit>? credits)
    {
        if (credits is null)
        {
            return ClientStatus.Inactive.ToString();
        }
        
        if (credits.Any(c => c.Status == CreditStatus.Late))
        {
            return ClientStatus.Late.ToString(); 
        }

        if (credits.Any(c => c.Status == CreditStatus.Active))
        {
            return ClientStatus.Paid.ToString(); 
        }
        return ClientStatus.Inactive.ToString();
    }

    private static List<ClientDto> QueryClients(List<ClientDto> queryableClients, string? query)
    {
        if (!string.IsNullOrEmpty(query))
        {
            queryableClients = queryableClients.Where(client =>
                IsMatch(client.Id.ToString(), query) ||
                IsMatch(client.FirstName, query) ||
                IsMatch(client.LastName, query) ||
                IsMatch(client.Phone, query) ||
                IsMatch(client.Address, query) ||
                IsMatch(client.Status, query)
            ).ToList();
        }
        return queryableClients;
    }
    
    private static bool IsMatch(string? value, string query)
    {
        return value != null && value.Contains(query, StringComparison.OrdinalIgnoreCase);
    }
    
    public async Task<ClientStatsDto> GetClientStatsAsync()
    {
        var dbClients = await _db.Client.Include(c => c.Credits).ToListAsync();

        var clientStats = new ClientStatsDto
        {
            TotalClients = dbClients.Count,
            PaidClients = dbClients.Count(client => GetClientStatus(client.Credits) == ClientStatus.Paid.ToString()),
            LateClients = dbClients.Count(client => GetClientStatus(client.Credits) == ClientStatus.Late.ToString()),
            InactiveClients = dbClients.Count(client => GetClientStatus(client.Credits) == ClientStatus.Inactive.ToString())
        };

        return clientStats;
    }
    
    public async Task Create(ClientDto clientDto)
    {
        var client = new Client()
        {
            FirstName = clientDto.FirstName,
            LastName = clientDto.LastName,
            Address = clientDto.Address,
            Birthdate = clientDto.Birthdate.ToDateTime(TimeOnly.MinValue),
            IdentificationNumber = clientDto.IdentificationNumber,
            Phone = clientDto.Phone,
            Email = clientDto.Email
        };
        await _db.Client.AddAsync(client);
        await _db.SaveChangesAsync();
        
        await _db.WorkDetails.AddAsync(new WorkDetails()
        {
            ClientId = client.Id,
            Workplace = clientDto.WorkPlace,
            Workphone = clientDto.WorkPhone,
            BossName = clientDto.BossName,
            BossPhone = clientDto.BossPhone,
            StartDate = clientDto.StartDate.ToDateTime(TimeOnly.MinValue),
            WorkAddress = clientDto.WorkAddress
        });

        await _db.References.AddAsync(new References()
        {
            ClientId = client.Id,
            PersonalName1 = clientDto.PersonalReference1,
            PersonalPhone1 = clientDto.PersonalReferencePhone1,
            PersonalName2 = clientDto.PersonalReference2,
            PersonalPhone2 = clientDto.PersonalReferencePhone2,
            WorkName1 = clientDto.WorkReference1,
            WorkPhone1 = clientDto.WorkReferencePhone1,
            WorkName2 = clientDto.WorkReference2,
            WorkPhone2 = clientDto.WorkReferencePhone2
        });
        
        await _db.SaveChangesAsync();

    }
    
}