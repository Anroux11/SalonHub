using AutoMapper;
using SalonHub.CrudAppService.Bookings.Dto;
using SalonHub.Domain.Bookings;

namespace SalonHub.CrudAppService.Mapper
{
    public class UserMapProfile : Profile
    {
        public UserMapProfile()
        {
            CreateMap<BookingDto, Booking>();
            CreateMap<Booking, BookingDto>();
                //.ForMember(dto => dto.bookingAddress, opt => opt.MapFrom(src => src.bookingAddress));

            //CreateMap<Address, AddressDto>();
            //CreateMap<AddressDto, Address>();

            //CreateMap<Salon, SalonDto>()
                //.ForMember(dto => dto.Address, opt => opt.MapFrom(src => src.Address));
        }
    }
}
