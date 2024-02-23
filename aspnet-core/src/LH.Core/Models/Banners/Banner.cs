using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LH.Models.Banners
{
    [Table("LhBanners")]
    public class Banner : FullAuditedEntity, IMustHaveTenant
    {
        public int TenantId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }
        public string Type { get; set; }
        public string ImageUrl { get; set; }
        public bool IsActive { get; set; }
    }
}
