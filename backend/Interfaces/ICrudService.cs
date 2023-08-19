namespace CreditBoss.Interfaces;

public interface ICrudService<T> where T : class
{
    Task<IEnumerable<T>> GetAll();
    Task<T> GetById(int id);
    Task Create(T entity);
    Task Update(T entity);
    Task Delete(int id);
}