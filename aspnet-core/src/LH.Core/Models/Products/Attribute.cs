using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LH.Models.Products
{
    public class Attribute : Entity, IMustHaveTenant
    {
        public int TenantId { get; set; }
        public string AttributeValue { get; set; }
        public string ColorCode { get; set; }
        public int ProductAttributeId { get; set; }
    }
}
