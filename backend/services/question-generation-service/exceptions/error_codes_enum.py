from enum import Enum

class ErrorCodeEnum(Enum):
    QUESTION_NOT_FOUND = ("QUESTION_GENERATOR_SERVICE_1001","Question not found in database")
    QUESTION_TYPE_NOT_PROVIDED = ("QUESTION_GENERATOR_SERVICE_1002","Question type not mentioned")
    OPTION_NOT_PROVIDED = ("QUESTION_GENERATOR_SERVICE_1003","For MCQ question options must provided")
    INTERNAL_SERVER_ERROR = ("QUESTION_GENERATOR_SERVICE_1004", "Unexpected internal server error")
    QUESTION_TEXT_NOT_PROVIDED = ("QUESTION_GENERATOR_SERVICE_1005","Question text not provided ")
    QUESTION_TYPE_NOT_VALID = ("QUESTION_GENERATOR_SERVICE_1006","The provided question type is not valid")
    AUTHER_ID_MISSING = ("QUESTION_GENERATOR_SERVICE_1007","Auther id or user id must present in the request")


    def __init__(self,code,message):
        self._code = code
        self._message = message


    @property
    def code(self):
        return self._code


    @property
    def message(self):
        return self._message

    def to_dict(self):
        return {
            "errorCode":self.code,
            "errorMessage":self.message
        }

