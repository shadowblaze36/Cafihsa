namespace CreditBoss.Dto;

public class ClientDto
{
    public int Id { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public string? Address { get; set; }
    public DateOnly Birthdate { get; set; }
    public string? IdentificationNumber { get; set; }
    public string? Status { get; set; }
    public string? WorkPlace { get; set; }
    public string? WorkPhone { get; set; }
    public DateOnly StartDate { get; set; }
    public string? WorkAddress { get; set; }
    public string? BossName { get; set; }
    public string? BossPhone { get; set; }
    public string? PersonalReference1 { get; set; }
    public string? PersonalReferencePhone1 { get; set; }
    public string? PersonalReference2 { get; set; }
    public string? PersonalReferencePhone2 { get; set; }
    public string? WorkReference1 { get; set; }
    public string? WorkReferencePhone1 { get; set; }
    public string? WorkReference2 { get; set; }
    public string? WorkReferencePhone2 { get; set; }
}