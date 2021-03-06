﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class DCategory
    {
        [Key]
        public int id { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string Name { get; set; }

        public int IsActive { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string Description { get; set; }
    }
}
