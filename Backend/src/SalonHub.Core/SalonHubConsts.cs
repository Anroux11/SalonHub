using SalonHub.Debugging;

namespace SalonHub
{
    public class SalonHubConsts
    {
        public const string LocalizationSourceName = "SalonHub";

        public const string ConnectionStringName = "Default";

        public const bool MultiTenancyEnabled = true;


        /// <summary>
        /// Default pass phrase for SimpleStringCipher decrypt/encrypt operations
        /// </summary>
        public static readonly string DefaultPassPhrase =
            DebugHelper.IsDebug ? "gsKxGZ012HLL3MI5" : "a41ad7b588aa4f26948c1c725a8ee72a";
    }
}
