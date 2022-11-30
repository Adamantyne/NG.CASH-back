<h1>NG.CASH Transactions API</h1>
<h2>Seja bem vindo à sua nova carteira!!</h2>
<h3>Este repositório conterá a API que provê os dados para a aplicação "<a href="https://github.com/Adamantyne/-NG.CASH-front">NG.CASH Transactions</a>".<h3>

<hr/>

<h2>Stack:</h2>

<p>Backend: Node.js, Typescript, PostgreSQL, Prisma, Jest, Supertest, Express.js e Docker</p>

<hr/>
<h2>Importante:</h2>
<h3>Para o bom funcionamento da aplicação, será necessária a criação de alguns arquivos ".env" na raiz do projeto:</h3>
<ol>
<li>Entre na pasta do projeto e tome como referência o arquivo <code>.env.example</code></li>
<li>Com base nesse arquivo, crie dois novos arquivos na raiz da pasta chamados <code>.env</code> e <code>.env.test</code> (Obs: "<code>POSTGRES_HOST=db</code>", "<code>POSTGRES_PORT=5432</code>", "<code>PORT=5000</code>")</li>
<li>Agora crie mais dois novos arquivos na raiz da pasta chamados <code>.env.local</code> e <code>.env.test.local</code> (Obs: "<code>POSTGRES_HOST=localhost</code>", "<code>POSTGRES_PORT=5432</code>", "<code>PORT=5000</code>")</li>
</ol>

<hr/>

<h2>Rodando o projeto com Docker:</h2>

<h3>Para subir o projeto utilizando docker é necessário a execução de alguns passos:</h3>
<br/>

<ul>
<li>Primeiro, é necessário criar a imagem e executar o container referente ao backend:
<ol>
  <li>Na pasta do projeto, execute o segunte comando: <code>$ docker-compose up</code></li>
  <li>Com isso, serão criadas imagens que darão suporte a aplicação, além de executá-las como containers</li>
  <li>Caso o processo apresente alguma falha, execute <code>$ docker-compose up --build</code> para tentar novamente</li>
  <li>No final do processo, o servidor estará disponível localmente na url: <code>http://localhost:5000</code> (lembre-se de manter o terminal aberto)</li>
  </li>
</ol>
</li>
</ul>


<hr/>

<h2>Rodando o projeto sem Docker:</h2>

<h3>Para subir o projeto localmente, siga os seguintes passos:</h3>
<br/>

<ul>
<li>Na pasta do projeto:
<ol>
  <li>Execute <code>$ npm i</code> para instalar as dependências</li>
  <li>Execute <code>$ npm run dev</code> para subir o servidor</li>
  <li>No final do processo, o servidor estará disponível localmente na url: <code>http://localhost:5000</code> (lembre-se de manter o terminal aberto)</li>
  </li>
</ol>
</li>
</ul>

<hr/>

<h2>Executando testes de integração:</h2>

<h3>Para fazer os testes de integração, acesse a pasta  do projeto e realize os seguintes passos:</h3>
<br/>

<ul>
<li>Testando com docker</code>:
<ol>
  <li>Execute <code>$ npm run test:docker</code> e aguarde a instalação das imagens e execução dos testes</li>
  <li>Caso o processo apresente alguma falha, execute <code>$ npm run test:docker --build</code> para tentar novamente
  </li>
</ol>
</li>
</ul>

<ul>
<li>Testando sem docker</code>:
<ol>
  <li>Execute <code>$ npm run test:local</code> e aguarde a execução dos testes</li>
</ol>
</li>
</ul>
<hr/>

<h3><a href="https://www.linkedin.com/in/guilherme-alves-teixeira/">Linkedin</a></h3>

<h3><a href="https://github.com/Adamantyne/-NG.CASH-front">Repositório frontend</a></h3>