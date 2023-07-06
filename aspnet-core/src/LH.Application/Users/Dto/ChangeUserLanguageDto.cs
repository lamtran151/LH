using System.ComponentModel.DataAnnotations;

namespace LH.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}