# ArenaPass - Sistema de Ingressos Copa do Mundo 2026

Sistema moderno e acessível de compra e gerenciamento de ingressos para a Copa do Mundo.

## 🎯 Funcionalidades

### Para Usuários
- **Tela Inicial**: Partidas em destaque, filtros por time/data/estádio, navegação intuitiva
- **Detalhes da Partida**: Informações completas, categorias de ingressos, preços
- **Seleção de Assentos**: Mapa interativo do estádio, visualização em tempo real
- **Pagamento Seguro**: Múltiplas formas de pagamento (Cartão, Pix, Carteira Digital)
- **Meus Ingressos**: Ingressos digitais com QR Code, transferência, download offline
- **Explorar**: Navegação por estádios e seleções
- **Perfil**: Gerenciamento de conta e configurações

### Para Administradores
- **Dashboard**: Analytics de vendas, métricas em tempo real
- **Gestão de Ingressos**: Controle de disponibilidade por partida
- **Relatórios**: Gráficos de receita, ocupação, categorias mais vendidas

## ♿ Acessibilidade

O sistema foi desenvolvido com foco em acessibilidade:

- ✅ **Modo Alto Contraste**: Aumenta a legibilidade para usuários com baixa visão
- ✅ **Tamanho de Fonte Ajustável**: 3 níveis de tamanho (12px - 24px)
- ✅ **ARIA Labels**: Navegação otimizada para leitores de tela
- ✅ **Hierarquia Visual Clara**: Espaçamento adequado e tipografia legível
- ✅ **Indicadores Visuais**: Estados claros para elementos interativos

## 🎨 Design

### Paleta de Cores
- **Primary (Verde)**: `#1E7F43` - Ação principal, CTAs
- **Accent (Amarelo)**: `#F5C518` - Destaques, elementos selecionados
- **Background**: `#FFFFFF` - Fundo principal
- **Text**: `#1A1A1A` - Texto principal

### Tipografia
- **Headings**: Poppins (Medium, 500)
- **Body**: Inter (Regular, 400)

### Características
- Cards com bordas arredondadas (12px)
- Sombras suaves para profundidade
- Micro-interações para feedback visual
- Layout responsivo (mobile-first)

## 🚀 Tecnologias

- **React 18** com TypeScript
- **React Router 7** para navegação
- **Tailwind CSS v4** para estilização
- **Recharts** para gráficos (dashboard admin)
- **Lucide React** para ícones
- **Material UI** e **Radix UI** para componentes

## 📱 Navegação

### Rotas Disponíveis
- `/` - Tela inicial
- `/match/:id` - Detalhes da partida
- `/seat-selection/:id` - Seleção de assentos
- `/payment/:id` - Pagamento
- `/my-tickets` - Meus ingressos
- `/explore` - Explorar estádios e times
- `/profile` - Perfil do usuário
- `/admin` - Dashboard administrativo (desktop)

## 🌐 Idioma

Interface em **Português (Brasil)** para público brasileiro e internacional de língua portuguesa.

## 📊 Estrutura de Componentes

```
src/app/components/
├── HomeScreen.tsx           # Tela inicial com partidas
├── MatchDetails.tsx         # Detalhes e categorias
├── SeatSelection.tsx        # Mapa de assentos interativo
├── PaymentScreen.tsx        # Checkout e pagamento
├── MyTickets.tsx            # Ingressos do usuário
├── ExploreScreen.tsx        # Exploração de conteúdo
├── ProfileScreen.tsx        # Perfil e configurações
├── AdminDashboard.tsx       # Dashboard administrativo
├── BottomNavigation.tsx     # Navegação inferior
├── AccessibilitySettings.tsx # Configurações de acessibilidade
└── ImageWithFallback.tsx    # Componente de imagem
```

## 🎫 Fluxo de Compra

1. **Descoberta**: Usuário navega pelas partidas na home
2. **Seleção**: Escolhe uma partida e visualiza detalhes
3. **Assentos**: Seleciona assentos no mapa interativo do estádio
4. **Pagamento**: Escolhe método de pagamento e finaliza
5. **Confirmação**: Recebe ingresso digital com QR Code

## 🔐 Segurança

- Criptografia de nível bancário para pagamentos
- Validação de dados do usuário
- QR Codes únicos por ingresso
- Proteção contra fraudes

## 📈 Métricas (Admin)

O dashboard administrativo oferece:
- Receita total e tendências
- Ingressos vendidos por categoria
- Taxa de ocupação por partida
- Análise de performance por estádio
- Alertas para partidas quase esgotadas

---

## 📐 Justificativa — Princípios de Usabilidade Aplicados

### 1. Arquitetura da Informação e Mapa do Site

Mapeamento estrutural de como o sistema web é organizado a partir do menu lateral fixo.

**Menu Lateral (Nível 1):**
- Início / Exploração
- Meus Ingressos
- Notificações / Alertas
- Perfil / Acessibilidade
- Dashboard (Visão Admin)

**Fluxo de Compra (Nível 2):**

> Detalhes da Partida → Sala de Espera / Fila Virtual → Seleção de Assentos (Mapa do Estádio) → Carrinho / Revisão → Checkout de Pagamento

### 2. Geração de Wireframes (Esboços de Baixa Fidelidade)

Criação do esqueleto visual com foco na eliminação de sobrecarga cognitiva e facilidade de cliques.

- **Tela da Fila Virtual:** Indicador claro de progresso (posição X de Y) e estimativa de tempo de espera.
- **Tela de Seleção de Assentos:** Filtros destacados para assentos acessíveis (PCD) e funcionalidade de seleção em bloco para grupos e famílias.
- **Tela de Checkout:** Layout limpo e linear (passo a passo para idosos), exibindo a conversão automática de moeda para estrangeiros.

### 3. Design System Inicial (Alta Fidelidade)

Aplicação da identidade visual definida na Fase 1:

- **Cores:** Predominância de Branco e Cinza Claro para o fundo; Verde para CTAs (botões de ação, confirmação e compra); Preto/Azul Escuro para os textos, garantindo alto contraste.
- **Tipografia:** Fonte sem serifa moderna com estilos de texto específicos e tamanhos ampliados para o modo de acessibilidade.
- **Componentes:** Cards de partidas padronizados com hierarquia visual clara.

### 4. Prototipação Navegável e Microinterações

Interconexão das telas criando a experiência real de uso:

- Simulação do fluxo de login / cadastro rápido.
- Simulação do painel de disponibilidade de ingressos atualizando em tempo real.
- Geração do ingresso digital via QR Code com opção de visualização offline.

---

**ArenaPass** - Sua experiência na Copa do Mundo começa aqui! ⚽🏆
