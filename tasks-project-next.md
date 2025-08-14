## Node lts

Verifica se está usando a versão lts
verifica se existe atualização para os pacotes

## package.json

```json
{
  "name": "mundial-revenda-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack -p 5555",
    "build": "next build",
    "start": "next start -p 5555",
    "lint": "next lint"
  }
  // ...resto do arquivo permanece igual
}
```

## gitingnore

```makedown
# others
.well-known
new-project.md
.github
rest-client.http

```

# git flow

```shell

git add .
git commit -m " task final adjustments and completion"
git flow feature finish featr-01 -- só use se estiver tudo ok, ou apena der commit - cuidado não execute se for deletar

git flow release start rls-01
-- finish release
git flow release finish rls-01
Release rls-01 

git push origin main develop --follow-tags

git flow feature start featr-02

```

```shell
git checkout develop

git branch -D feature/featr-239

git branch

```
