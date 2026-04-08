from sqlalchemy import Column, Integer, String
from database import Base

class Registro(Base):
    __tablename__ = "registros"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String(100), unique=True, nullable=False)
    descricao = Column(String(500), nullable=False)
    categoria = Column(String(50), nullable=False)
    status = Column(String(20), nullable=False)