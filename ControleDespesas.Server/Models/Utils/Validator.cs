using ControleDespesas.Server.Models;

namespace ControleDespesas.Models.Utils
{
    public class Validator
    {
        public static bool ValidateTipoDespesa(TipoDespesa tipoDespesa, out string response)
        {
            List<string> errors = new List<string>();

            if (string.IsNullOrWhiteSpace(tipoDespesa.Nome))
            {
                errors.Add("Nome é obrigatório.");
            }

            response = null;
            return true;
        }
      
    }
}
