using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModelLayer.BO
{
    public abstract class ServiceReturnType
    {
        #region Service Result Definitions

        public static ServiceResult<bool> SuccessBoolResult
        {
            get
            {
                return new ServiceResult<bool>
                {
                    Message = "Operation Successful",

                    IsSuccessful = true,
                    Result = true
                };
            }
        }


        public static ServiceResult<bool> FailureBoolResult
        {
            get
            {
                return new ServiceResult<bool>
                {
                    Message = "Operation Unsuccessful",

                    IsSuccessful = false,
                    Result = false
                };
            }
        }

        public static ServiceResult<T> FailureWithDataResult<T>(object data)
        {
            return new ServiceResult<T>
            {

                IsSuccessful = false,
                Message = "Failed",
                Result = data is T ? (T)data : default(T)
            };
        }

        public static ServiceResult<T> SuccessWithDataResult<T>(object data)
        {
            return new ServiceResult<T>
            {

                IsSuccessful = true,
                Message = "Success",
                Result = data is T ? (T)data : default(T)
            };
        }


        #endregion




        public class ServiceResult<T>
        {
            public bool IsSuccessful { get; set; }
            public bool IsSessionExpired { get; set; }
            public T Result { get; set; }
            public string Message { get; set; }
            public string ErrorDetails { get; set; }
        }

    }
}
