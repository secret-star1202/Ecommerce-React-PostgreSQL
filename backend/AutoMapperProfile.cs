using System;
using System.Dynamic;
using AutoMapper;
using backend.DTOs.Product;
using backend.DTOs.User;
using backend.DTOs.Category;
using backend.Models;
using backend.DTOs.Cart;
using backend.DTOs.CartItem;

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
        CreateMap<Category, GetCategoryDTO>();
        CreateMap<AddCategoryDTO, Category>();
        CreateMap<UpdateCategoryDTO, Category>();
        CreateMap<CartDTO, Cart>();
        CreateMap<CartItemDTO, CartItem>();




  }
}

