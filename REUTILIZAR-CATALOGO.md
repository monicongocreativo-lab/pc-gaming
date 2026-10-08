# Reutilizar o catálogo nativo na secção de ambiente

O desenho combina `.setup-scene` à esquerda e `.setup-catalog` à direita, dentro de `.setup-showcase`. O catálogo deixa de ser repetido no final da landing. Em mobile, o painel aparece abaixo do ambiente, sem scroll interno.

## O que foi fornecido

O HTML enviado contém `<section id="maquinas-aston">`, 24 cartões renderizados e um link para todas as máquinas. Não contém a consulta, paginação nem os handlers React de favoritos/comparador. Copiar esse HTML para um campo rico congela os produtos e não conserva essas funcionalidades.

## Integração no projeto Eurosys

Na árvore de componentes do site, colocar a secção nativa de máquinas no lugar do catálogo da pré-visualização, como segundo filho de `.setup-showcase`. Aplicar-lhe a classe `setup-catalog` sem alterar a consulta, os cartões ou os handlers. Usar a família da rota (ASTON/HYDRA/RAPTOR), preservando o filtro original.

Manter os IDs `maquinas-aston`, `maquinas-hydra` e `maquinas-raptor` e atualizar os links «Explorar a gama» e «Encontrar a minha máquina» para o ID correspondente. Remover a montagem antiga do catálogo no final para evitar duplicação.

A grelha nativa é o `div.grid` que contém os artigos `data-testid="product-card"`. Dentro do painel, adaptar apenas as colunas à largura disponível (duas normalmente, três em desktop amplo, uma em mobile estreito). Não manter o breakpoint de quatro colunas da página original num painel lateral. Evitar alterar estilos globais dos cartões.

Se a secção original limita a 24 produtos, preserva-se esse limite e o link «Ver todas» até se adaptar a paginação/carregamento para apresentar a família completa. O protótipo local lê todas as páginas do catálogo público; isto não significa que a secção nativa faça o mesmo.

## Limite do CMS

Um campo de HTML rico colocado depois dos produtos não pode, por si só, mudar a posição do componente nativo. É necessário suporte do template/componente no projeto real. Não foi alterado o CMS nem o site de produção.

## Pré-visualização

O projeto autónomo usa o adaptador local já existente para apresentar os dados reais com cartões de referência. Não inclui botões inativos de Guardar/Comparar. Na integração final, essas funcionalidades devem vir dos cartões originais Eurosys, e não de uma cópia do HTML renderizado.
