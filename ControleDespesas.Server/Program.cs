using ControleDespesas.Models;
using ControleDespesas.Server.Services;

var builder = WebApplication.CreateBuilder(args);

// Adicionar os servi�os necess�rios
builder.Services.AddControllers();
builder.Services.AddScoped<Contexto>();
builder.Services.AddScoped<ITipoDespesaService, TipoDespesaService>();

// Configurar o Swagger (opcional para documenta��o)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
//obriga os endpoints a serem lowercase
builder.Services.AddRouting(options => options.LowercaseUrls = true);

// Adicionando a pol�tica CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        builder => builder
            .WithOrigins("https://localhost:5173")  // URL do frontend
            .AllowAnyMethod()  // Permite qualquer m�todo HTTP
            .AllowAnyHeader());  // Permite qualquer cabe�alho
});

var app = builder.Build();

// Usar CORS antes de qualquer outra configura��o
app.UseCors("AllowFrontend");

// Configura��o de arquivos est�ticos e Swagger (opcional)
app.UseDefaultFiles();
app.UseStaticFiles();

// Configura��o do Swagger para desenvolvimento
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

// Configura��o do fallback para SPA
app.MapFallbackToFile("/index.html");

app.Run();
