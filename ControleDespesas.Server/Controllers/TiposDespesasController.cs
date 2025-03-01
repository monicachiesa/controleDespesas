using ControleDespesas.Server.Models;
using ControleDespesas.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace ControleDespesas.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TiposDespesasController : ControllerBase
    {
        private readonly ITipoDespesaService _tipoDespesaService;

        public TiposDespesasController(ITipoDespesaService tipoDespesaService)
        {
            _tipoDespesaService = tipoDespesaService;
        }

        [HttpGet]
        [Route("All")]
        public async Task<ActionResult<IEnumerable<TipoDespesa>>> GetTipoDespesas()
        {
            try
            {
                var tipoDespesas = await _tipoDespesaService.GetTipoDespesas();
                return Ok(tipoDespesas);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro ao buscar tipos de despesas", error = ex.Message });
            }
        }

        [HttpGet("TipoDespesaByNome")]
        public async Task<ActionResult<IEnumerable<TipoDespesa>>> GetTipoDespesasByName([FromQuery] string nome)
        {
            try
            {
                var tipoDespesas = await _tipoDespesaService.GetTipoDespesasByNome(nome);
                if (tipoDespesas == null || !tipoDespesas.Any())
                    return NotFound(new { message = "Não existem tipos de despesas com este nome" });

                return Ok(tipoDespesas);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro ao buscar tipos de despesas por nome", error = ex.Message });
            }
        }

        [HttpGet("{id:int}", Name = "GetTipoDespesa")]
        public async Task<ActionResult<TipoDespesa>> GetTipoDespesa(int id)
        {
            try
            {
                var tipoDespesa = await _tipoDespesaService.GetTipoDespesa(id);
                return Ok(tipoDespesa);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro ao buscar tipo de despesa", error = ex.Message });
            }
        }

        [HttpPost]
        public async Task<ActionResult> Create([FromBody] TipoDespesa tipoDespesa)
        {
            try
            {
                await _tipoDespesaService.CreateTipoDespesa(tipoDespesa);

                return CreatedAtRoute(nameof(GetTipoDespesa), new { id = tipoDespesa.Id }, tipoDespesa);
            }
            catch (ArgumentNullException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro ao criar tipo de despesa", error = ex.Message });
            }
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Update(int id, [FromBody] TipoDespesa tipoDespesa)
        {
            try
            {
                if (tipoDespesa.Id != id)
                    return BadRequest(new { message = "Dados inconsistentes" });

                await _tipoDespesaService.UpdateTipoDespesa(tipoDespesa);

                return Ok(new { message = "Tipo de despesa atualizado com sucesso" });
            }
            catch (ArgumentNullException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro ao atualizar tipo de despesa", error = ex.Message });
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                await _tipoDespesaService.DeleteTipoDespesa(id);

                return Ok(new { message = "Tipo de despesa excluído com sucesso" });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro ao excluir tipo de despesa", error = ex.Message });
            }
        }
    }
}
