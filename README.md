# NFC FUTURE — Site oficial

Site institucional e catálogo da NFC FUTURE. Pedidos e orçamentos acontecem pelo WhatsApp dos fundadores.

Feito com React, TypeScript, Tailwind CSS e TanStack Start. Editado pela [Lovable](https://lovable.dev/projects/7852066b-4913-40d3-967b-0fb5a3490e42).

## Onde editar o conteúdo

Tudo fica em **`src/data.ts`**:

- `founders[].whatsapp`: números de Vitor e João (só dígitos, com 55 + DDD, ex.: `5511999998888`).
- `site.instagram` e `site.email`.
- `products`: nome, descrição, preço (`null` = "Sob consulta"), `showPrice`, disponibilidade e foto.
- `solutions`: soluções e seus status.
- `messages`: textos que vão pré-preenchidos no WhatsApp.

## Rodar localmente

```sh
npm install
npm run dev
```

## Hospedagem na Square Cloud

A Square Cloud não compila projetos nem instala `devDependencies`. Por isso a compilação é feita
automaticamente pelo GitHub Actions (`.github/workflows/squarecloud.yml`):

1. A cada push na branch `main`, o GitHub instala as dependências, roda os testes, gera o servidor
   Node.js (`npm run build:node` → `.output/server/index.mjs`) e testa se ele inicia.
2. O resultado, já com o arquivo `squarecloud.app`, é publicado na branch **`squarecloud`**
   e também fica disponível como ZIP (artefato `nfc-future-squarecloud`) na execução da Action.
3. A Square Cloud, ligada à branch `squarecloud`, faz o deploy automaticamente.

O servidor lê `PORT` e `HOST`, que a Square Cloud define como `80` e `0.0.0.0`. Nenhuma variável
de ambiente é necessária.

**Primeira vez:**

1. No GitHub, abra **Actions → Build para Square Cloud** e confirme que a execução ficou verde.
2. Abra essa execução e baixe o artefato **nfc-future-squarecloud** (é um ZIP).
3. Na Square Cloud, em **Upload / Nova aplicação**, envie esse ZIP (não descompacte).
4. Na aplicação criada, conecte o GitHub e escolha o repositório e a branch **`squarecloud`**.

Para trocar o subdomínio ou a memória, edite `SQUARECLOUD_SUBDOMAIN` e `SQUARECLOUD_MEMORY` no
arquivo da Action.

Para gerar o mesmo servidor no seu computador (Linux/macOS): `npm run build:node` e depois
`npm start`.
