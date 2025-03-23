using ControleDespesas.Server.Models;

namespace ControleDespesas.Server.Services.JWT
{
    public interface IJWTService
    {
        public string GenerateToken(Usuario user);
    }
}
