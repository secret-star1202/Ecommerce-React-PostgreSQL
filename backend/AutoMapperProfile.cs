using System;
using AutoMapper;
using backend.DTOs.Product;
using backend.Models;
namespace backend;
public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<Product, GetProductDTO>();
        CreateMap<AddProductDTO, Product>();
        CreateMap<UpdateProductDTO, Product>();
    }
}

