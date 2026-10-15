# Barbearia Imperial

Landing page demonstrativa para uma barbearia, feita com HTML, CSS e JavaScript nativos. O projeto não usa framework, bibliotecas JavaScript, gerenciador de pacotes nem processo de compilação.

## Objetivos do projeto

A página apresenta os serviços, diferenciais, galeria, história, depoimentos e informações de contato da Barbearia Imperial em uma única página. A estrutura foi pensada para ser simples de abrir, estudar e modificar, mantendo o layout responsivo e recursos básicos de acessibilidade.

> **Importante:** este é um projeto de demonstração. O próprio site informa que o endereço físico não está definido e que o número de telefone/WhatsApp exibido anteriormente era fictício. Não use os dados, depoimentos, avaliações, preços ou perfis sociais de exemplo como informações comerciais reais sem verificá-los e atualizá-los.

## Tecnologias

- **HTML5:** organiza o conteúdo e as seções, usando elementos semânticos como `header`, `nav`, `main`, `section`, `article` e `footer`.
- **CSS3:** controla o visual, as cores, a tipografia, as animações e os breakpoints responsivos. Não há framework CSS.
- **JavaScript nativo (ES6+):** implementa o menu móvel, a navegação suave, o estado do cabeçalho durante a rolagem, os efeitos de entrada ao rolar e a atualização do ano no rodapé.
- **Google Fonts:** fornece as fontes Inter e Playfair Display. O CSS mantém fontes de sistema como alternativas caso as fontes externas não carreguem.
- **Unsplash Images:** hospeda a fotografia principal e as imagens da galeria e da seção “Sobre”. A página depende de conexão com a internet para carregar esses recursos externos.
- **SVG inline:** os ícones são desenhados no próprio HTML, sem dependência de uma biblioteca de ícones.

Não há `package.json`, etapa de build ou instalação de dependências. O navegador executa diretamente os arquivos do projeto.

## Estrutura dos arquivos

```text
.
├── index.html   # conteúdo, estrutura e metadados da página
├── styles.css   # estilos, identidade visual, responsividade e animações
├── script.js    # interações do menu, rolagem e efeitos
└── README.md    # documentação do projeto
```

## Como abrir o projeto

### Opção simples

Abra `index.html` em um navegador.

### Com Live Server no VS Code

1. Instale a extensão **Live Server** no VS Code.
2. Abra `index.html`.
3. Clique em **Go Live** na barra de status.

O servidor local atualiza a página quando os arquivos são salvos. Para testar em um celular, o computador e o celular devem estar na mesma rede Wi-Fi; use no celular o endereço IP local do computador e a porta indicada pelo Live Server.

## Organização da página

As seções principais estão em `index.html`, nesta ordem:

1. **Cabeçalho:** marca, navegação por âncoras e acesso às informações de contato.
2. **Hero:** apresentação principal, chamada visual, links para serviços e contato e avaliação demonstrativa.
3. **Serviços:** cartões com serviços, preços e durações de exemplo.
4. **Diferenciais:** lista de características ilustradas com SVG inline.
5. **Galeria:** imagens carregadas sob demanda.
6. **Sobre:** texto institucional demonstrativo, imagem e indicadores.
7. **Depoimentos:** comentários e avaliações de exemplo.
8. **Contato e localização:** informa claramente que não há endereço físico definido nem telefone/WhatsApp real disponível.
9. **CTA e rodapé:** reforçam o caráter demonstrativo e agrupam links e dados de contato.

Os links do menu apontam para IDs das seções, como `#inicio`, `#servicos`, `#sobre` e `#contato`.

## Decisões de implementação

### HTML e acessibilidade

- O idioma do documento é `pt-BR`, e a página inclui `charset`, configuração de viewport, título e descrição para navegadores e mecanismos de busca.
- Os títulos e landmarks semânticos dão estrutura ao conteúdo e ajudam tecnologias assistivas.
- Há um link “Pular para o conteúdo”, rótulos acessíveis para controles e textos alternativos nas imagens.
- Ícones decorativos são marcados para não serem anunciados desnecessariamente; ícones que acompanham avaliações têm rótulos textuais.
- Os controles de navegação são links e botões HTML nativos para preservar comportamentos esperados por teclado e leitor de tela.

### CSS, visual e responsividade

- As cores, famílias tipográficas, altura do cabeçalho, raio dos cartões e curva de animação ficam em variáveis CSS no início de `styles.css`. Isso facilita ajustar a identidade visual em um único lugar.
- O layout usa CSS Grid e Flexbox e se adapta à largura disponível por meio de media queries; não depende de um framework de componentes.
- As cores escuras e douradas e as fontes Inter/Playfair Display foram escolhidas para criar a identidade visual da barbearia.
- As animações de revelação e o zoom suave do hero são feitos com CSS. A regra `prefers-reduced-motion` reduz movimento para visitantes que assim configuraram o sistema.
- O CSS fica em uma folha externa para separar apresentação e conteúdo, manter a estrutura legível e permitir o cache do arquivo pelo navegador.

### JavaScript e interações

O `script.js` não usa dependências externas. Ele:

- abre e fecha o menu móvel, atualizando `aria-expanded` e o rótulo do botão;
- fecha o menu ao selecionar um link, pressionar `Escape` ou mudar para uma tela larga;
- implementa rolagem suave para âncoras, compensando a altura do cabeçalho;
- aplica o estilo de cabeçalho durante a rolagem usando um listener passivo;
- marca no menu a seção visível com `IntersectionObserver`;
- revela elementos à medida que entram na tela, também com `IntersectionObserver`;
- mostra o conteúdo sem efeitos de revelação quando `IntersectionObserver` não está disponível;
- atualiza o ano no rodapé com a data do navegador.

O JavaScript é incluído ao final do `body`, depois do conteúdo HTML, para que os elementos que ele consulta já existam ao executar.

### Imagens e desempenho

- A imagem de fundo do hero é a mesma fotografia do Unsplash usada anteriormente; sua função visual foi preservada.
- O hero tem `fetchpriority="high"` porque aparece no primeiro viewport e pode ser o maior elemento de conteúdo (LCP).
- O `srcset` oferece a mesma fotografia em larguras de 640, 960, 1280, 1600 e 1920 pixels. Com `sizes="100vw"`, o navegador pode selecionar uma resolução apropriada à tela e à densidade do dispositivo, em vez de sempre baixar a maior.
- A URL da imagem usa `auto=format`, permitindo que o serviço entregue um formato moderno compatível com o navegador, como AVIF ou WebP, com fallback conforme o suporte.
- As imagens da galeria e da seção “Sobre” usam `loading="lazy"` porque ficam fora da área inicial e podem ser carregadas quando o visitante se aproxima delas.
- As imagens são servidas externamente; portanto, o formato e o tamanho efetivamente recebidos dependem do serviço de imagens, do navegador e da conexão. O Lighthouse deve ser executado novamente no ambiente de publicação para medir o resultado real.
- Não foi criada uma cópia local otimizada: o projeto continua usando a imagem original do Unsplash, sem inventar um caminho ou substituir a fotografia.

## Como personalizar

- **Texto, links e metadados:** edite `index.html`.
- **Cores, tipografia, espaçamento e breakpoints:** edite as variáveis e regras em `styles.css`.
- **Comportamentos interativos:** edite `script.js`.
- **Imagem do hero:** altere em conjunto `src` e cada URL de `srcset` para manter todos os candidatos apontando à mesma fotografia. Preserve descrições `alt` adequadas e a prioridade alta enquanto a imagem continuar sendo o destaque inicial.
- **Imagens da galeria:** substitua as URLs em `index.html` e atualize os textos alternativos para descrever as novas imagens.
- **Contato e localização:** atualize os textos da seção de contato e do rodapé quando houver informações reais. Remova o aviso de indisponibilidade somente depois de confirmar os novos dados.
- **Fontes:** ajuste a URL do Google Fonts no `head` e as variáveis `--font-sans` e `--font-serif` em `styles.css` em conjunto.

## Testes e validação

Não há suíte de testes, linter ou script de build configurado. Para uma verificação manual:

1. Abra a página no navegador ou pelo Live Server.
2. Teste o menu em largura móvel e desktop, inclusive com teclado (`Tab`, `Enter` e `Escape`).
3. Confira os links internos, as imagens, os textos e o layout em diferentes larguras.
4. Ative a preferência de redução de movimento do sistema e confirme que as animações são reduzidas.
5. Execute o Lighthouse no ambiente em que o site será hospedado e compare as métricas em condições semelhantes.

Uma nota do Lighthouse depende do dispositivo, da rede, do navegador, do cache e dos serviços externos; por isso, o projeto não promete uma pontuação específica.
ok quai