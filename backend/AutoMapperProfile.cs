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
        CreateMap<AddCartDTO, Cart>();
        CreateMap<Cart,CartDTO>();
        CreateMap<CartItemDTO, CartItem>();
        CreateMap<CartItem, CartItemDTO>();
        CreateMap<AddCartDTO, CartItem>();
        
        CreateMap< CartDTO, CartItem>();
        CreateMap<AddCartDTO, Product>();

        CreateMap<GetUserDTO, User>();
        CreateMap<GetProductDTO, Product>();
        CreateMap<GetCategoryDTO, Category>();
        CreateMap<AddCartDTO, Cart>();
        CreateMap<AddCartItemDTO, CartItem>();
        CreateMap<Category, AddCategoryDTO>();
        CreateMap<Product, AddProductDTO>();
        CreateMap<Cart, AddCartDTO>();
        CreateMap<Cart, AddCartItemDTO>();
        CreateMap<CartDTO, Cart>();
        CreateMap<User, AddUserDTO>();
        CreateMap<CartItem, AddCartItemDTO>();

    }
}

