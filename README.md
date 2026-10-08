# Eurosys — famílias gaming

Referência visual aprovada de ASTON, HYDRA e RAPTOR. Esta pasta contém o projeto autónomo completo, com os recursos utilizados. A adaptação simplificada ao editor HTML do CMS não faz parte desta versão.

## Executar

Requer Node.js 18 ou superior. Não há dependências npm para instalar.

```sh
node server.cjs
```

Abrir:

- ASTON: http://127.0.0.1:4173/?familia=ASTON
- HYDRA: http://127.0.0.1:4173/?familia=HYDRA
- RAPTOR: http://127.0.0.1:4173/?familia=RAPTOR

Verificar sintaxe com `npm run check` se npm estiver disponível, ou executar `node --check` nos quatro ficheiros JavaScript/CJS principais.

## Apresentação preservada

- Subheader com PC GAMING, as três famílias, acesso às máquinas e controlo de pausa.
- Destaque principal com faixa inferior separada dos botões.
- Ambiente com texto e segunda máquina centrados, sem alternância Hardware.
- Identidade, componentes interativos e detalhes visuais.
- Catálogo no final. A secção genérica «O desempenho começa na configuração certa» foi retirada.
- Logótipos com flutuação suave. HYDRA tem dimensão reduzida e halo estático ajustado ao contorno; RAPTOR foi aumentado.
- Pausa e preferência por movimento reduzido.

## Catálogo e integração

O servidor de pré-visualização lê o catálogo público Eurosys e segue a paginação. Preços, disponibilidade e contagens dependem da consulta; não são fixos. Requer acesso à Internet. Se a consulta falhar, a página mostra acesso ao catálogo original.

Este adaptador é exclusivo de desenvolvimento: na Eurosys, reutilizar a fonte e os componentes nativos do catálogo. O header e footer globais devem ser fornecidos pelo site anfitrião.

GitHub Pages serve ficheiros estáticos e não executa `server.cjs`: o catálogo dinâmico precisa de uma fonte apropriada nesse alojamento. Esta pasta está preparada para versionamento, não implica publicação nem integração automática no CMS.

## Recursos

Mantidos os nomes e caminhos de origem para preservar as referências. Fontes Google e imagens de produto remotas requerem Internet. Os recursos locais de apresentação estão incluídos.

Os SVG ASTON e RAPTOR incluem imagens incorporadas. HYDRA referencia `HYDRA/Hydra-1.png`; o ficheiro está incluído. A iluminação apresentada na versão atual segue o contorno vetorial.

Fotografias e copy de apresentação são propostas comerciais; validar direitos de utilização antes da publicação. Não existem FPS inventados nem promessas de desempenho por família.

## GitHub

Usar o conteúdo desta pasta como raiz do repositório. Não incluir as pastas de recursos originais ou arquivo de trabalho que estão fora dela. Não foi criado nem publicado um repositório remoto.

