# CRUD de Registros com FastAPI, MySQL e JavaScript

Este projeto implementa um CRUD completo para a entidade **Registro**, com os campos:

- `nome`
- `descricao`
- `categoria`
- `status`

O sistema possui:

- **backend** em **FastAPI**
- **banco de dados** em **MySQL** rodando com **Docker**
- **frontend** simples em **HTML, CSS e JavaScript**
- comunicação com o backend via **endpoints REST**, como pedido na especificação do projeto :contentReference[oaicite:0]{index=0} :contentReference[oaicite:1]{index=1}

---

## Estrutura do projeto

```bash
crudFrontBack/
│
├── backend/
│   ├── .venv/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   └── requirements.txt
│
└── frontend/
    ├── index.html
    ├── style.css
    └── script.js
```
## Como rodar o projeto

### 1. Clonar o repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd crudFrontBack
```

```bash
cd backend
```

### 2. Criar e Ativar ambiente virtual

```bash
python -m venv .venv
.venv\Scripts\Activate.ps1
```

### 3. Instalar dependências 

```bash
pip install -r requirements.txt
```

### 4. Subir banco MySQL com Docker 

```bash
docker run --name mysql-crud -e MYSQL_ROOT_PASSWORD=admin -e MYSQL_DATABASE=crud_registros -p 3306:3306 -d mysql:8.0
```

### 5. Rodar o backend

```bash
uvicorn main:app --reload
```

### 5. Rodar o frontend

```bash
cd ..
cd frontend
```

Abra o arquivo index.html no navegador e veja a mágica acontecer...
