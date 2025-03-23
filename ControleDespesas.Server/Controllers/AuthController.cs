
using ControleDespesas.Server.Models;
using ControleDespesas.Server.Services.JWT;
using Microsoft.AspNetCore.Mvc;

namespace ControleDespesas.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IJWTService _jwtService;

        public AuthController(IJWTService jwtService)
        {
            _jwtService = jwtService;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] Usuario user)
        {
            if (user.Email == "monica.chiesa@universo.univates.br" && user.Senha == "123456")
            {
                var token = _jwtService.GenerateToken(user);
                return Ok(new { token });
            }
            return Unauthorized("Usuário ou senha inválidos");
        }
    }

}
