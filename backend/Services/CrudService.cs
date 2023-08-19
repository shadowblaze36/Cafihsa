using CreditBoss.Data;
using Microsoft.EntityFrameworkCore;

namespace CreditBoss.Services;

public abstract class CrudService<T> where T : class
{
    private readonly CreditBossContext _db;

    protected CrudService(CreditBossContext db)
    {
        _db = db;
    }

    public virtual async Task<IEnumerable<T>> GetAll()
    {
        return await _db.Set<T>().ToListAsync();
    }

    public virtual async Task<T> GetById(int id)
    {
        return await _db.Set<T>().FindAsync(id);
    }

    public virtual async Task Create(T entity)
    {
        _db.Set<T>().Add(entity);
        await _db.SaveChangesAsync();
    }

    public virtual async Task Update(T entity)
    {
        _db.Entry(entity).State = EntityState.Modified;
        await _db.SaveChangesAsync();
    }

    public virtual async Task Delete(int id)
    {
        var entity = await _db.Set<T>().FindAsync(id);
        _db.Set<T>().Remove(entity);
        await _db.SaveChangesAsync();
    }
}
