from uuid import UUID
from pydantic import BaseModel,Field


class PrepareRequest(BaseModel):
    examId:UUID=Field(...,description="ID of the exam")
    userId:int = Field(...,description="User id is required")
    jobId:UUID = Field(...,description="Job id is required")




