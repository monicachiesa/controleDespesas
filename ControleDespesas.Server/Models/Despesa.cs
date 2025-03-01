namespace ControleDespesas.Server.Models
{
    public class Despesa
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string? Descritivo { get; set; }
        public DateTimeOffset Data {  get; set; }
        public int IdTipoDespesa { get; set; }
        public TipoDespesa TipoDespesa { get; set; } = new TipoDespesa();
        public bool Excluido { get; set; }
    }
}
