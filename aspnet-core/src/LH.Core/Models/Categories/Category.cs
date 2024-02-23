using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using Abp.UI.Inputs;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LH.Models.Categories
{
    [Table("LhCategories")]
    public class Category : FullAuditedEntity, IMustHaveTenant
    {
        public int TenantId { get; set; }
        public string Title { get; set; }
        public string Slug { get; set; }
        public string ParentId { get; set; }
        public int DisplayNumber { get; set; }
        public bool IsMenu { get; set; }
        public string ImageUrl { get; set; }
        public string IconUrl { get; set; } 
        public string MetaTitle { get; set; }
        public string MetaDescription { get; set; }
        public bool IsActive { get; set; }
    }
}
