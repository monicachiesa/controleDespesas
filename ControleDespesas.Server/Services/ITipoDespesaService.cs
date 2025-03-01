using ControleDespesas.Server.Models;
using ControleDespesas.Server.Models.Filters;
using Microsoft.AspNetCore.Mvc;

namespace ControleDespesas.Server.Services
{
    public interface ITipoDespesaService
    {
        Task<IEnumerable<TipoDespesa>> GetTipoDespesas(FilterModel filter);
        Task<TipoDespesa> GetTipoDespesa(int id);
        Task CreateTipoDespesa(TipoDespesa tipoDespesa);
        Task DeleteTipoDespesa(int id);
        Task UpdateTipoDespesa(TipoDespesa tipoDespesa);
    }
}
