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
    public class DProductController : ControllerBase
    {
        private readonly ProductDBContext _context;

        public DProductController(ProductDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DProduct>>> GetDProduct()
        {

            return await _context.DProducts.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DProduct>> GetDProduct(int id)
        {
            var dProduct = await _context.DProducts.FindAsync(id);

            if (dProduct == null)
            {
                return NotFound();
            }

            return dProduct;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutDProduct(int id, DProduct dProduct)
        {
            dProduct.id = id;

            _context.Entry(dProduct).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DProductExists(id))
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
        public async Task<ActionResult<DCategory>> PostDProduct(DProduct dProduct)
        {
            _context.DProducts.Add(dProduct);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDProduct", new { id = dProduct.id }, dProduct);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<DProduct>> DeleteDProduct(int id)
        {
            var dProduct = await _context.DProducts.FindAsync(id);
            if (dProduct == null)
            {
                return NotFound();
            }

            _context.DProducts.Remove(dProduct);
            await _context.SaveChangesAsync();

            return dProduct;
        }

        private bool DProductExists(int id)
        {
            return _context.DProducts.Any(e => e.id == id);
        }
    }
}
