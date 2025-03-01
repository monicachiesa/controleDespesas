using ControleDespesas.Server.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ControleDespesas.Models
{
    public class Contexto : DbContext
    {
        readonly IConfiguration _configuration;
        public DbSet<Despesa> Despesas { get; set; }
        public DbSet<TipoDespesa> TiposDespesas { get; set; }

        public Contexto(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // Configure PostgreSQL connection
            optionsBuilder.UseNpgsql(_configuration.GetConnectionString("Default"));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TipoDespesa>(entity =>
            {
                // Fluent API configuration for Aluno entity
                entity.ToTable("tipo_despesa"); // Define table name
                entity.HasKey(e => e.Id); // Define primary key

                entity.Property(e => e.Nome)
                    .HasMaxLength(100)
                    .IsRequired();

                entity.Property(e => e.Descricao);

                entity.Property(e => e.Excluido);
            });

            modelBuilder.Entity<Despesa>(entity =>
            {       
                entity.ToTable("despesa"); 
                entity.HasKey(e => e.Id); 

                entity.Property(e => e.Nome)
                    .HasMaxLength(100)
                    .IsRequired();

                entity.Property(e => e.Descritivo);

                entity.Property(e => e.IdTipoDespesa)
                    .IsRequired();

                entity.Property(e => e.Data)
                    .IsRequired();

                entity.Property(e => e.Excluido);

                entity.HasOne(e => e.TipoDespesa)
                    .WithMany(t => t.Despesas) 
                    .HasForeignKey(e => e.IdTipoDespesa)
                    .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}
