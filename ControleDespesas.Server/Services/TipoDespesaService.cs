using ControleDespesas.Models;
using ControleDespesas.Models.Utils;
using ControleDespesas.Server.Models;
using ControleDespesas.Server.Models.Filters;
using ControleDespesas.Server.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ControleDespesas.Server.Services
{
    public class TipoDespesaService : ITipoDespesaService
    {
        private readonly Contexto _context;

        public TipoDespesaService(Contexto context)
        {
            _context = context;
        }

        public async Task CreateTipoDespesa(TipoDespesa? tipoDespesa)
        {
            if (tipoDespesa == null)
                throw new ArgumentNullException(nameof(tipoDespesa), "O tipoDespesa não pode ser nulo.");

            if (Validator.ValidateTipoDespesa(tipoDespesa, out string response))
            {
                _context.TiposDespesas.Add(tipoDespesa);
                await _context.SaveChangesAsync();
            }
            else
            {
                throw new Exception(response);
            }
        }

        public async Task DeleteTipoDespesa(int id)
        {
            var tipoDespesaBanco = await _context.TiposDespesas.FindAsync(id);

            if (tipoDespesaBanco == null)
                throw new KeyNotFoundException($"TipoDespesa com ID {id} não encontrado.");

            _context.Entry(tipoDespesaBanco).State = EntityState.Modified;
            tipoDespesaBanco.Excluido = true;
            await _context.SaveChangesAsync();
        }

        public async Task<TipoDespesa> GetTipoDespesa(int id)
        {
            var tipoDespesa = await _context.TiposDespesas.FindAsync(id);

            if (tipoDespesa == null)
                throw new KeyNotFoundException($"TipoDespesa com ID {id} não encontrado.");

            return tipoDespesa;
        }

        public async Task<IEnumerable<TipoDespesa>> GetTipoDespesas(FilterModel filter)
        {
            var query = _context.TiposDespesas
                .Where(d => d.Excluido != true);

            var result = await query.ToListAsync(); // Executa no banco e traz os resultados

            if (!string.IsNullOrWhiteSpace(filter.SearchValue))
            {
                string valueNormalized = Functions.RemoveDiacritics(filter.SearchValue).ToLower();

                result = result
                    .Where(d => Functions.RemoveDiacritics(d.Nome).ToLower().Contains(valueNormalized) ||
                                Functions.RemoveDiacritics(d.Descricao).ToLower().Contains(valueNormalized))
                    .ToList();
            }

            return result;
        }
        public async Task UpdateTipoDespesa(TipoDespesa tipoDespesa)
        {
            if (tipoDespesa == null)
                throw new ArgumentNullException(nameof(tipoDespesa), "O tipoDespesa não pode ser nulo.");

            if (Validator.ValidateTipoDespesa(tipoDespesa, out string response))
            {
                _context.Entry(tipoDespesa).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            else
            {
                throw new Exception(response);
            }
        }
    }
}
