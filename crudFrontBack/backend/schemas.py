from pydantic import BaseModel, Field
from typing import Literal

class RegistroBase(BaseModel):
    nome: str = Field(..., min_length=3, max_length=100)
    descricao: str = Field(..., max_length=500)
    categoria: str
    status: Literal["ativo", "inativo"]

class RegistroCreate(RegistroBase):
    pass

class RegistroUpdate(RegistroBase):
    pass

class RegistroResponse(RegistroBase):
    id: int

    class Config:
        from_attributes = True