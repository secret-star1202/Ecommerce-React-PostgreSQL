using System;
using System.Dynamic;
using AutoMapper;
using backend.DTOs.Product;
using backend.DTOs.User;
using backend.Models;
namespace backend;
public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<Product, GetProductDTO>();
        CreateMap<AddProductDTO, Product>();
        CreateMap<UpdateProductDTO, Product>();
        CreateMap<User, GetUserDTO>();
        CreateMap<AddUserDTO, User>();
        CreateMap<UpdateUserDTO, User>();

  }
}

