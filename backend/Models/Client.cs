using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CreditBoss.Models
{
    public class Client
    {
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? Address { get; set; }
        public DateTime Birthdate { get; set; }
        public string? IdentificationNumber { get; set; }

        public ICollection<Credit>? Credits { get; set; }
        public WorkDetails? WorkDetails { get; set; }
        public References? References { get; set; }
    }
}
