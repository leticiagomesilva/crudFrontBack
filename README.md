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
