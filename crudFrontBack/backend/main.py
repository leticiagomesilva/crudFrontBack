from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import Base, engine, get_db
from models import Registro
from schemas import RegistroCreate, RegistroUpdate, RegistroResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

CATEGORIAS_VALIDAS = ["Categoria A", "Categoria B", "Categoria C"]

@app.post("/registros", response_model=RegistroResponse)
def criar_registro(registro: RegistroCreate, db: Session = Depends(get_db)):
    if registro.categoria not in CATEGORIAS_VALIDAS:
        raise HTTPException(status_code=400, detail="Categoria inválida")

    existente = db.query(Registro).filter(Registro.nome == registro.nome).first()
    if existente:
        raise HTTPException(status_code=409, detail="Nome já cadastrado")

    novo = Registro(**registro.dict())
    db.add(novo)
    db.commit()
    db.refresh(novo)
    return novo

@app.get("/registros", response_model=list[RegistroResponse])
def listar_registros(db: Session = Depends(get_db)):
    return db.query(Registro).all()

@app.get("/registros/{id}", response_model=RegistroResponse)
def buscar_registro(id: int, db: Session = Depends(get_db)):
    registro = db.query(Registro).filter(Registro.id == id).first()
    if not registro:
        raise HTTPException(status_code=404, detail="Registro não encontrado")
    return registro

@app.put("/registros/{id}", response_model=RegistroResponse)
def atualizar_registro(id: int, dados: RegistroUpdate, db: Session = Depends(get_db)):
    registro = db.query(Registro).filter(Registro.id == id).first()
    if not registro:
        raise HTTPException(status_code=404, detail="Registro não encontrado")

    if dados.categoria not in CATEGORIAS_VALIDAS:
        raise HTTPException(status_code=400, detail="Categoria inválida")

    nome_existente = db.query(Registro).filter(Registro.nome == dados.nome, Registro.id != id).first()
    if nome_existente:
        raise HTTPException(status_code=409, detail="Nome já cadastrado")

    registro.nome = dados.nome
    registro.descricao = dados.descricao
    registro.categoria = dados.categoria
    registro.status = dados.status

    db.commit()
    db.refresh(registro)
    return registro

@app.delete("/registros/{id}")
def deletar_registro(id: int, db: Session = Depends(get_db)):
    registro = db.query(Registro).filter(Registro.id == id).first()
    if not registro:
        raise HTTPException(status_code=404, detail="Registro não encontrado")

    db.delete(registro)
    db.commit()
    return {"mensagem": "Registro removido com sucesso"}