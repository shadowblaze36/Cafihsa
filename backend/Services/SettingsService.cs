using Cafihsa.Data;
using Cafihsa.Interfaces;

namespace Cafihsa.Services;

public class SettingsService : ISettingsService
{
    private readonly CafihsaContext _db;
    
    public SettingsService(CafihsaContext db)
    {
        _db = db;
    }
}