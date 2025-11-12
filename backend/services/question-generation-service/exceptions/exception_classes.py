from exceptions.error_codes_enum import ErrorCodeEnum
from http import HTTPStatus
class BaseLevelException(Exception):

    def __init__(self,error_code = ErrorCodeEnum.INTERNAL_SERVER_ERROR,status_code = 500,custom_message = None):
        self.error_code = error_code
        self.status_code = status_code
        self.message = custom_message or error_code.message
        super().__init__(self.message)

    def to_dict(self):
        return {
            "errorCode":self.error_code.code,
            "errorMessage":self.error_code.message
        }



class OptionNotFoundException(BaseLevelException):
    def __init__(self,custom_message=None):

        super().__init__(
            ErrorCodeEnum.OPTION_NOT_PROVIDED,
            HTTPStatus.BAD_REQUEST,
            custom_message)

class InternalServerError(BaseLevelException):
    def __init__(self,custom_message=None):
        super().__init__(
            ErrorCodeEnum.INTERNAL_SERVER_ERROR,
            HTTPStatus.INTERNAL_SERVER_ERROR,
            custom_message)
