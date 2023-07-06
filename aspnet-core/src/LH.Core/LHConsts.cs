using LH.Debugging;

namespace LH
{
    public class LHConsts
    {
        public const string LocalizationSourceName = "LH";

        public const string ConnectionStringName = "Default";

        public const bool MultiTenancyEnabled = true;


        /// <summary>
        /// Default pass phrase for SimpleStringCipher decrypt/encrypt operations
        /// </summary>
        public static readonly string DefaultPassPhrase =
            DebugHelper.IsDebug ? "gsKxGZ012HLL3MI5" : "7da5b95107bc42d4913dacb4ff9b97c7";
    }
}
