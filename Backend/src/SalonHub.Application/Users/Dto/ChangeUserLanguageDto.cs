using System.ComponentModel.DataAnnotations;

namespace SalonHub.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}