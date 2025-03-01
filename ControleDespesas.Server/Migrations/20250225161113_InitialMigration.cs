using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace ControleDespesas.Server.Migrations
{
    /// <inheritdoc />
    public partial class InitialMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tipo_despesa",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Nome = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Descricao = table.Column<string>(type: "text", nullable: false),
                    Excluido = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tipo_despesa", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "despesa",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Nome = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Descritivo = table.Column<string>(type: "text", nullable: true),
                    Data = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    IdTipoDespesa = table.Column<int>(type: "integer", nullable: false),
                    Excluido = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_despesa", x => x.Id);
                    table.ForeignKey(
                        name: "FK_despesa_tipo_despesa_IdTipoDespesa",
                        column: x => x.IdTipoDespesa,
                        principalTable: "tipo_despesa",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_despesa_IdTipoDespesa",
                table: "despesa",
                column: "IdTipoDespesa");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "despesa");

            migrationBuilder.DropTable(
                name: "tipo_despesa");
        }
    }
}
