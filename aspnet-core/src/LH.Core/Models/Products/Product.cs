using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LH.Models.Products
{
    public class Product : FullAuditedEntity, IMustHaveTenant
    {
        public int TenantId { get; set; }
        public string Name { get; set; }
        public string Slug { get; set; }
        public string ProductCondition { get; set; }
        public int CategoryId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public decimal? Discount { get; set; }
        public string DiscountType { get; set; }
        public string Summary { get; set; }
        public string Description { get; set; }
        public string Features { get; set; }
        public bool IsFeautured { get; set; }
        public bool IsRefundable { get; set; }
        public bool IsAllowEstShip { get; set; }
        public string ProcessingTime { get; set; }
        public string ShippingTime { get; set; }
        public string ImageUrl { get; set; }
        public string ImageAdditionalUrl { get; set; }
        public string MetaTitle { get; set; }
        public string MetaDescription { get; set; }
        public string MetaKeywords { get; set; }
        public bool IsActive { get; set; }
    }
}
