## Como rodar a aplicação?
1. `npm install` para instalar todas as dependencias do projeto
2.  copie o arquivo `.env.exemple` para `.env` e preencha as credenciais
3.  npm run nodemon
4.  Utilize como quiser!
   - Meu discord para duvidas: Legiteey#3386


**comandos git**
- `git add` git add serve para adicionar arquivos para uma etapa chamada "staged"
 - use `git add . ` para adicionar todos os arquivos de uma vez
- `git commit` git comit serve para adicionar uma versão com os arquivos que estão na etapa staged
 - exemplo de uso: `git commit -m "titulo da mudança feita"` -m significa mensagem
- `git push` serve para eu subir todas minhas mudanças para nuvém(github) 
 - exemplo de uso: `git push origin main` origin é o nome que eu dei para a nuvém e main é minha bash atual 

### gitignore
gitignore serve para para não compartilhar arquivos PRIVADOS e arquivos GERADOS

### env exemple
o .env.exemple é um arquvo que reflete o .env e mostra as chaves que meu programa precisa.

### package json
O package json é o gerenciador de dependencias eu coloco tudo que meu projeto depende para ser executado, eu também posso explicitar comandos que vou usar, para executar os comandos eu digito: `npm run <command>`, (`command` é o comando que vou executar)

# Anotações
## Conceitos básicos do git
1. Repositório – é o agrupamento lógico do arquivos de um projeto. Imagine que você tem dois projetos diferentes um de e-commerce e um de blog, o código fonte de cada um deles ficará separado em repositório diferentes.
2. Origin – se refere ao repositório original, a fonte principal. É o repositório remoto que sincroniza o código de todos os desenvolvedores do projeto. O Github é um repositório origin por exemplo.
3. Branch – o git trabalha com “ramos”, e o termo branch se refere a um ramo de código. Quando você cria um branch, você herda todo o código na versão atual. O seu branch fica isolado, quando você terminar suas modificações, você une seu ramo de volta ao código original. Deste ponto em diante, todos que atualizarem o código terão sua versão.  
4. Master – master é o ramo principal, normalmente é onde o código mais atual ou seja, a versão que está rodando em produção fica guardado.
5. Commit – o commit representa uma versão. O usual é fazer alterações no código, em diversos arquivos separados e assim que tivermos uma versão funcional, fazemos um commit incluindo todas as modificações que foram feitas até então. Esse commit vira um ponto na história que podemos resgatar quando quisermos.
6. Checkout – ação de apontar o repositório para uma certa versão ou branch.
