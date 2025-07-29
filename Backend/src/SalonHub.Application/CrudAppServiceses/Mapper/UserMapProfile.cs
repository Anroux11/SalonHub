using AutoMapper;
using SalonHub.CrudAppServiceses.Addresses.Dto;
using SalonHub.CrudAppServiceses.SalonAdmin.Dto;
using SalonHub.CrudAppServiceses.Reports.DTo;
using SalonHub.Domain.Addresses;
using SalonHub.Domain.Bookings;
using SalonHub.Domain.Salons;

namespace SalonHub.CrudAppServiceses.Mapper
{
    public class UserMapProfile : Profile
    {
        public UserMapProfile()
        {
            CreateMap<BookingDto, Booking>();
            CreateMap<Booking, BookingDto>()
                .ForMember(dto => dto.bookingAddress, opt => opt.MapFrom(src => src.bookingAddress));

            CreateMap<Address, AddressDto>();
            CreateMap<AddressDto, Address>();

            CreateMap<Salon, SalonDto>()
                .ForMember(dto => dto.Address, opt => opt.MapFrom(src => src.Address));
        }
    }
}
