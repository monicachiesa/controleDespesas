using System.Globalization;
using System.Text;

namespace ControleDespesas.Server.Utils
{
    public static class Functions
    {
        //função para remover acentuação
        public static string RemoveDiacritics(string text)
        {
            if (string.IsNullOrEmpty(text))
                return text;

            return string.Concat(text
                .Normalize(NormalizationForm.FormD)
                .Where(c => CharUnicodeInfo.GetUnicodeCategory(c) != UnicodeCategory.NonSpacingMark))
                .Normalize(NormalizationForm.FormC);
        }
    }
}
