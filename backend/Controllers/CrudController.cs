using CreditBoss.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CreditBoss.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public abstract class CrudController<T> : ControllerBase where T : class
    {
        private readonly ICrudService<T> _crudService;

        protected CrudController(ICrudService<T> crudService)
        {
            _crudService = crudService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var entities = await _crudService.GetAll();
            return Ok(entities);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var entity = await _crudService.GetById(id);

            return Ok(entity);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] T entity)
        {
            await _crudService.Create(entity);
            return Ok();
        }
        

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] T entity)
        {
            if (id != GetEntityId(entity))
            {
                return BadRequest();
            }

            await _crudService.Update(entity);
            return Ok();
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var entity = await _crudService.GetById(id);

            if (entity == null)
            {
                return NotFound();
            }

            await _crudService.Delete(id);
            return Ok();
        }

        protected abstract int GetEntityId(T entity);
    }
}