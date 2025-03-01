using ControleDespesas.Models;
using ControleDespesas.Server.Services;

var builder = WebApplication.CreateBuilder(args);

// Adicionar os serviços necessários
builder.Services.AddControllers();
builder.Services.AddScoped<Contexto>();
builder.Services.AddScoped<ITipoDespesaService, TipoDespesaService>();

// Configurar o Swagger (opcional para documentação)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
//obriga os endpoints a serem lowercase
builder.Services.AddRouting(options => options.LowercaseUrls = true);

// Adicionando a política CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        builder => builder
            .WithOrigins("https://localhost:5173")  // URL do frontend
            .AllowAnyMethod()  // Permite qualquer método HTTP
            .AllowAnyHeader());  // Permite qualquer cabeçalho
});

var app = builder.Build();

// Usar CORS antes de qualquer outra configuração
app.UseCors("AllowFrontend");

// Configuração de arquivos estáticos e Swagger (opcional)
app.UseDefaultFiles();
app.UseStaticFiles();

// Configuração do Swagger para desenvolvimento
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Redirecionar HTTPS
app.UseHttpsRedirection();

app.UseAuthorization();

// Mapeamento de controllers
app.MapControllers();

// Configuração do fallback para SPA
app.MapFallbackToFile("/index.html");

app.Run();
