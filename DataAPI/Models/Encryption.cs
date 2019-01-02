using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace DataAPI.Models
{
    public class Encryption
    {
        public static string Encrypt(string encryptString)
        {
            string EncryptionKey = "jbGgrDTBLOjceg9SdJvVHrDPVMjpQcl6ErVt6Han2Mw3zX5U2is0cyLw5tQoNuVJxKiRUyTvVXwVlOY7M7kKs5QNT1rjsXxJp4SGOkRfXlqKemBjI9ZICekPXO6l3ZIvGkEVCIfOWchlkGH5ohP7E2CSunFrHpaqTFP1v6zZgCsXxMHwmGs8RUEPeeGGQ7xAdFgefKIBkULt6RgDn2sdCdGg3wXIPRKcv9TVzYUnb64g9TIu8FjzQbY6bKhuTVgW";
            byte[] clearBytes = Encoding.Unicode.GetBytes(encryptString);
            using (Aes encryptor = Aes.Create())
            {
                Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] {
            0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76
        });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateEncryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(clearBytes, 0, clearBytes.Length);
                        cs.Close();
                    }
                    encryptString = Convert.ToBase64String(ms.ToArray());
                }
            }
            return encryptString;
        }

        public static string Decrypt(string cipherText)
        {
            string EncryptionKey = "jbGgrDTBLOjceg9SdJvVHrDPVMjpQcl6ErVt6Han2Mw3zX5U2is0cyLw5tQoNuVJxKiRUyTvVXwVlOY7M7kKs5QNT1rjsXxJp4SGOkRfXlqKemBjI9ZICekPXO6l3ZIvGkEVCIfOWchlkGH5ohP7E2CSunFrHpaqTFP1v6zZgCsXxMHwmGs8RUEPeeGGQ7xAdFgefKIBkULt6RgDn2sdCdGg3wXIPRKcv9TVzYUnb64g9TIu8FjzQbY6bKhuTVgW";
            cipherText = cipherText.Replace(" ", "+");
            byte[] cipherBytes = Convert.FromBase64String(cipherText);
            using (Aes encryptor = Aes.Create())
            {
                Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] {
            0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76
        });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateDecryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(cipherBytes, 0, cipherBytes.Length);
                        cs.Close();
                    }
                    cipherText = Encoding.Unicode.GetString(ms.ToArray());
                }
            }
            return cipherText;
        }
    }
}
