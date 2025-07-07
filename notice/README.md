# Páginas de Pré-venda Storypix

## Descrição do Projeto

Este projeto consiste em duas páginas de pré-venda interativas para o aplicativo Storypix, seguindo uma estratégia de funil de conversão em duas etapas:

1. **Página 1 (index.html)**: Portal de notícias fictício "TechNews Brasil" apresentando a descoberta do Storypix como uma oportunidade jornalística
2. **Página 2 (formulario.html)**: Formulário de candidatura com design consistente ao Storypix para coleta de dados dos interessados

## Estrutura dos Arquivos

```
storypix-presell/
├── index.html              # Página principal (portal de notícias)
├── styles.css              # Estilos da página de notícias
├── script.js               # JavaScript da página de notícias
├── formulario.html          # Página do formulário
├── formulario.css           # Estilos do formulário (design Storypix)
├── formulario.js            # JavaScript do formulário
├── instagram-stories.png    # Imagem principal do artigo
├── pessoa-celular.jpg       # Imagem da sidebar
├── apps-dinheiro.jpg        # Imagem da sidebar
└── README.md               # Esta documentação
```

## Características das Páginas

### Página 1 - Portal de Notícias (index.html)

**Design e Layout:**
- Aparência profissional de portal jornalístico
- Header com logo "TechNews Brasil" e navegação
- Banner de notícias urgentes animado
- Layout responsivo com sidebar
- Paleta de cores: azul corporativo, vermelho para urgência, laranja para CTAs

**Conteúdo:**
- Artigo completo sobre a "descoberta" do Storypix
- Seção de comentários simulados de usuários
- Estatísticas animadas de usuários e pagamentos
- Múltiplos CTAs estrategicamente posicionados
- Sidebar com notícias relacionadas

**Elementos de Conversão:**
- Senso de urgência ("Vagas limitadas")
- Prova social (comentários e estatísticas)
- Credibilidade jornalística
- Benefícios claros (R$ 50 de bônus)
- CTAs destacados

### Página 2 - Formulário (formulario.html)

**Design e Layout:**
- Design consistente com o Storypix (gradiente rosa/magenta)
- Background escuro com gradientes
- Card branco centralizado com bordas arredondadas
- Ícone de presente animado
- Elementos de urgência dinâmicos

**Funcionalidades:**
- Formulário com validação em tempo real
- Máscaras de entrada (telefone)
- Contador de candidatos em tempo real
- Barra de progresso de vagas
- Timer de countdown
- Modal de sucesso com redirecionamento automático

**Elementos de Conversão:**
- Indicadores de urgência atualizados dinamicamente
- Seção de benefícios garantidos
- Proteção de dados (LGPD)
- Redirecionamento para https://storypix.digital/app/

## Funcionalidades JavaScript

### Página de Notícias (script.js)
- Atualização automática de data/hora
- Animação de estatísticas
- Contador de usuários online simulado
- Efeitos de hover e animações
- Tracking de cliques (simulado)
- Redirecionamento para formulário

### Formulário (formulario.js)
- Validação de formulário em tempo real
- Máscaras de entrada
- Contadores dinâmicos (candidatos, vagas, tempo)
- Salvamento local de dados (backup)
- Modal de sucesso
- Redirecionamento com parâmetros UTM
- Prevenção de abandono de formulário

## Responsividade

Ambas as páginas são totalmente responsivas:
- **Desktop**: Layout completo com sidebar
- **Tablet**: Layout adaptado, sidebar abaixo do conteúdo
- **Mobile**: Layout vertical, elementos empilhados

## Otimizações

### Performance
- Imagens otimizadas
- CSS e JavaScript minificados
- Lazy loading de imagens
- Preload da página de destino

### SEO
- Meta tags otimizadas
- Estrutura semântica HTML5
- Schema markup para artigos
- URLs amigáveis

### Acessibilidade
- Contraste adequado (WCAG AA)
- Navegação por teclado
- Alt text em imagens
- Labels apropriados em formulários

## Fluxo de Conversão

1. **Usuário acessa** a página de notícias (index.html)
2. **Lê o artigo** sobre a oportunidade do Storypix
3. **Clica em um CTA** ("Candidate-se agora")
4. **É redirecionado** para o formulário (formulario.html)
5. **Preenche os dados** pessoais
6. **Submete o formulário** e vê modal de sucesso
7. **É redirecionado** automaticamente para https://storypix.digital/app/

## Parâmetros UTM

O redirecionamento final inclui parâmetros para tracking:
```
https://storypix.digital/app/?utm_source=technews&utm_medium=presell&utm_campaign=form_conversion&utm_content=candidatura_completa
```

## Elementos de Urgência

### Página de Notícias
- Banner "URGENTE" animado
- Texto sobre vagas limitadas
- Estatísticas de usuários crescendo
- Comentários recentes de usuários

### Formulário
- Contador de candidatos do dia
- Barra de vagas disponíveis
- Timer de countdown para inscrições
- Mensagens de escassez

## Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilos modernos, gradientes, animações
- **JavaScript ES6+**: Funcionalidades interativas
- **Responsive Design**: Media queries
- **Web APIs**: LocalStorage, IntersectionObserver

## Como Usar

1. Hospede os arquivos em um servidor web
2. Acesse index.html como página inicial
3. Configure o redirecionamento final para o Storypix
4. Monitore conversões através dos parâmetros UTM

## Customizações Possíveis

- Alterar cores e branding
- Modificar textos e ofertas
- Ajustar valores e estatísticas
- Integrar com sistemas de email marketing
- Adicionar pixels de tracking (Facebook, Google)
- Conectar formulário com CRM/banco de dados

## Considerações de Compliance

- Política de privacidade mencionada
- Conformidade com LGPD
- Opt-in para comunicações
- Transparência sobre redirecionamento

