using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DCategoryController : ControllerBase
    {
        private readonly ProductDBContext _context;

        public DCategoryController(ProductDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DCategory>>> GetDCategory()
        {
            return await _context.DCategories.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DCategory>> GetDCategory(int id)
        {
            var dCandidate = await _context.DCategories.FindAsync(id);

            if (dCandidate == null)
            {
                return NotFound();
            }

            return dCandidate;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutDCategory(int id, DCategory dCategory)
        {
            dCategory.id = id;

            _context.Entry(dCategory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DCategoryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<DCategory>> PostDCategory(DCategory dCategory)
        {
            _context.DCategories.Add(dCategory);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDCategory", new { id = dCategory.id }, dCategory);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<DCategory>> DeleteDCategory(int id)
        {
            var dCategory = await _context.DCategories.FindAsync(id);
            if (dCategory == null)
            {
                return NotFound();
            }

            _context.DCategories.Remove(dCategory);
            await _context.SaveChangesAsync();

            return dCategory;
        }

        private bool DCategoryExists(int id)
        {
            return _context.DCategories.Any(e => e.id == id);
        }
    }
}
