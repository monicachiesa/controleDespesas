namespace ControleDespesas.Server.Models
{
    public class TipoDespesa
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; } = string.Empty;
        public bool Excluido { get; set; }
        public ICollection<Despesa> Despesas { get; set; } = [];
    }
}
