using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LH.Models.Products
{
    public class ProductAttribute : Entity, IMustHaveTenant
    {
        public int TenantId { get; set; }
        public string Name { get; set; }
        public int AttributeId { get; set; }
    }
}
