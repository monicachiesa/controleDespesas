using ControleDespesas.Server.Models;

namespace ControleDespesas.Server.Services
{
    public interface ITipoDespesaService
    {
        Task<IEnumerable<TipoDespesa>> GetTipoDespesas();
        Task<TipoDespesa> GetTipoDespesa(int id);
        Task<IEnumerable<TipoDespesa>> GetTipoDespesasByNome(string nome);
        Task CreateTipoDespesa(TipoDespesa tipoDespesa);
        Task DeleteTipoDespesa(int id);
        Task UpdateTipoDespesa(TipoDespesa tipoDespesa);
    }
}
