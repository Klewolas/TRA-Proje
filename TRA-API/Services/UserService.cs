using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using TRA_API.Data;
using TRA_API.DTO;
using TRA_API.Helpers;

namespace TRA_API.Services
{
    public interface IUserService
    {
        AuthenticateDTO Authenticate(UserDto userDto);
    }
    public class UserService : IUserService
    {
        private readonly UserContext userContext;
        private readonly AppSettings _appSettings;
        public UserService(UserContext userContext, IOptions<AppSettings> appSettings)
        {
            this.userContext = userContext;
            _appSettings = appSettings.Value;
        }      

        public AuthenticateDTO Authenticate(UserDto userDto)
        {
            var user = userContext.User.FirstOrDefault(x => x.UserName == userDto.userName && x.Password == userDto.password);

            if (user == null)
                return null;

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            AuthenticateDTO authenticateDTO = new AuthenticateDTO();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            authenticateDTO.token = tokenHandler.WriteToken(token);

            return authenticateDTO;
        }
    }
}
