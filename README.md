# Sobre o Projeto

## Membros
- Adalberto Barbosa Vieira - Backend
- Eduardo Cotta Guimarães França - Fullstack
- Gabriel Chaves Ferreira - Frontend
- Lívia Delgado de Almeida Carneiro - Fullstack

## Escopo

O sistema tem como finalidade habilitar a gestão de alocação de frota de veículos.
A persona é o proprio gestor da frota, o qual terá acesso a um dashboard gerencial, no qual poderá cadastrar veículos, gerir o estado de manutenção dos mesmos e alocar carros para motoristas.
Além disso, o gestor é notificado em caso de manutenções programadas.

## Tecnologias
- Frontend: `React`
- Backend: `NodeJS`, `Typescript` e `NestJS`
- Database: `PostgresSQL`

# Prototipação

O figma do projeto pode ser encontrado [aqui](https://www.figma.com/file/wqJ3OV2hayIyu3NYOiKenk/palantir?type=design&node-id=0-1&mode=design&t=oSIUZozwVaHgTDtX-0).

# Backlog 

## Backlog do Produto
1. Como Administrador de frota, gostaria de adicionar um veículo à minha frota.
2. Como Administrador de frota, gostaria de editar e deletar informações sobre um veículo.
3. Como Administrador de frota, gostaria de programar a manutenção de um veículo.
4. Como Administrador de frota, gostaria de receber notificações sobre manutenções que se aproximam.
5. Como Administrador de frota, gostaria de visualizar a distribuição dos veículos entre os estados de manutenção, alocados ou disponíveis.
6. Como Administrador de frota, gostaria de adicionar um motorista à base de dados.
7. Como Administrador de frota, gostaria de editar e deletar informações sobre motoristas.
8. Como Administrador de frota, gostaria de alocar um veículo para um motorista.
9. Como Administrador de frota, gostaria de editar e deletar a alocação de um veículo para um motorista.
10. Como Administrador de frota, gostaria de cadastrar uma rotatividade de alocação de motoristas aos veículos.
11. Como Administrador de frota, gostaria de receber relatórios periódicos sobre a minha frota.
12. Como Administrador de frota, gostaria de desabilitar veículos.
13. Como Administrador de frota, gostaria de desabilitar motoristas.
14. Como Administrador de frota, gostaria de receber um relatório com a alocação dos motoristas para auxiliar no pagamento dos mesmos.
15. Como Administrador de frota, gostaria de visualizar os custos de manutenção por veículo.

## Sprint 1

<details>
  <summary>Como Administrador de frota, gostaria de adicionar um veículo à minha frota.</summary>

  Tarefas:

  * Criar aplicação base em React
  * Instalar o banco de dados e criar as primeiras tabelas
  * Criar aplicação base Node
  * Criar docker compose para subir todas as aplicações
  * Implementar API para adicionar um veículo
  * Implementar tela de cadastro de veículo

</details>

<details>
  <summary>Como Administrador de frota, gostaria de editar e deletar informações sobre um veículo.</summary>

  Tarefas:

  * Implementar tela de listagem de veículos
  * Implementar API de listagem de veículos
  * Implementar API para obter informações de um veículo específico
  * Implementar API para editar um veículo
  * Implementar API para deletar um veículo
  * Implementar modal de confirmação de deleção de veículo
</details>

<details>
  <summary>Como Administrador de frota, gostaria de programar a manutenção de um veículo.</summary>
  
  Tarefas:

  * Implementar visualização da data de manutenção na tela de listagem de veículo
  * Adicionar botão de manutenção na tela de listagem de veículo
  * Implementar tela para cadastrar/editar manutenção do veículo
  * Implementar API para cadastrar/editar manutenção do veículo
</details>

<details>
  <summary>Como Administrador de frota, gostaria de receber notificações sobre manutenções que se aproximam.</summary>
    
  Tarefas:

  * Implementar tela para edição de informações do administrador (para cadastrar email)
  * Implementar API para salvar informações do gestor da frota
  * Implementar notificação para o gestor via email no dia anterior à data agendada para manutenção
</details>

<details>
  <summary>Como Administrador de frota, gostaria de visualizar a distribuição dos veículos entre os estados de manutenção, alocados ou disponíveis.</summary>
      
  Tarefas:

  * Implementar dashboard de controle da frota
  * Implementar API para o dashboard do controle de frota
</details>

<details>
  <summary>Como Administrador de frota, gostaria de adicionar um motorista à base de dados.</summary>
        
  Tarefas:

  * Implementar API para adicionar um motorista
  * Implementar tela de cadastro de motorista
</details>

<details>
  <summary>Como Administrador de frota, gostaria de editar e deletar informações sobre motoristas.</summary>
          
  Tarefas:

  * Implementar tela de listagem de motoristas
  * Implementar API de listagem de motoristas
  * Implementar API para obter motorista de um veículo específico
  * Implementar API para editar um motorista
  * Implementar API para deletar um motorista
  * Implementar modal de confirmação de deleção de motorista
</details>

<details>
  <summary>Como Administrador de frota, gostaria de alocar um veículo para um motorista.</summary>
        
  Tarefas:

  * Implementar visualização de motorista na tela de listagem de veículo
  * Adicionar tela de alocação de motorista ao veículo
  * Adicionar botão de alocação de motorista na tela de cadastro/edição de veículo
  * Adicionar API para cadastrar alocação e mudar status do motorista
</details>

<details>
  <summary>Como Administrador de frota, gostaria de editar e deletar a alocação de um veículo para um motorista.</summary>
          
  Tarefas:

  * Implementar opção de limpar a alocação na tela de alocação
  * Implementar API para deletar alocação
</details>

# Backlog do Sprint

As tarefas realizadas e seus responsáveis podem ser acessadas [neste projeto do Github](https://github.com/users/LivDelgado/projects/4/views/1?filterQuery=sprint%3A%22Sprint+2%22).

Quase todas as estórias foram completadas.
Faltaram apenas algumas tasks de frontend das estórias 8 e 9 - totalizando 89% de completude da sprint.

<details>
  <summary>Estórias e tarefas da sprint</summary>

  <details>
    <summary>Como Administrador de frota, gostaria de adicionar um veículo à minha frota.</summary>

    Tarefas:

    * Criar aplicação base em React -> Lívia
    * Instalar o banco de dados e criar as primeiras tabelas -> Lívia
    * Criar aplicação base Node -> Gabriel
    * Criar docker compose para subir todas as aplicações -> Gabriel
    * Implementar API para adicionar um veículo -> Lívia
    * Implementar tela de cadastro de veículo -> Lívia

  </details>

  <details>
    <summary>Como Administrador de frota, gostaria de editar e deletar informações sobre um veículo.</summary>

    Tarefas:

    * Implementar tela de listagem de veículos -> Lívia
    * Implementar API de listagem de veículos -> Lívia
    * Implementar API para obter informações de um veículo específico -> Lívia
    * Implementar API para editar um veículo -> Lívia
    * Implementar API para deletar um veículo -> Lívia
    * Implementar modal de confirmação de deleção de veículo -> Lívia
  </details>

  <details>
    <summary>Como Administrador de frota, gostaria de programar a manutenção de um veículo.</summary>
    
    Tarefas:

    * Implementar visualização da data de manutenção na tela de listagem de veículo -> Lívia
    * Adicionar botão de manutenção na tela de listagem de veículo -> Lívia
    * Implementar tela para cadastrar/editar manutenção do veículo -> Lívia
    * Implementar API para cadastrar/editar manutenção do veículo -> Lívia
  </details>

  <details>
    <summary>Como Administrador de frota, gostaria de receber notificações sobre manutenções que se aproximam.</summary>
      
    Tarefas:

    * Implementar tela para edição de informações do administrador (para cadastrar email) -> Gabriel
    * Implementar API para salvar informações do gestor da frota -> Adalberto
    * Implementar notificação para o gestor via email no dia anterior à data agendada para manutenção -> Adalberto
  </details>

  <details>
    <summary>Como Administrador de frota, gostaria de visualizar a distribuição dos veículos entre os estados de manutenção, alocados ou disponíveis.</summary>
        
    Tarefas:

    * Implementar dashboard de controle da frota -> Gabriel
    * Implementar API para o dashboard do controle de frota -> Adalberto
  </details>

  <details>
    <summary>Como Administrador de frota, gostaria de adicionar um motorista à base de dados.</summary>
          
    Tarefas:

    * Implementar API para adicionar um motorista -> Eduardo
    * Implementar tela de cadastro de motorista -> Eduardo
  </details>

  <details>
    <summary>Como Administrador de frota, gostaria de editar e deletar informações sobre motoristas.</summary>
            
    Tarefas:

    * Implementar tela de listagem de motoristas -> Eduardo e Gabriel
    * Implementar API de listagem de motoristas -> Eduardo
    * Implementar API para obter motorista de um veículo específico -> Eduardo
    * Implementar API para editar um motorista -> Eduardo
    * Implementar API para deletar um motorista -> Eduardo
    * Implementar modal de confirmação de deleção de motorista -> Eduardo
  </details>

  <details>
    <summary>Como Administrador de frota, gostaria de alocar um veículo para um motorista.</summary>
          
    Tarefas:

    * Implementar visualização de motorista na tela de listagem de veículo -> Gabriel
    * Adicionar tela de alocação de motorista ao veículo -> Gabriel
    * Adicionar botão de alocação de motorista na tela de cadastro/edição de veículo -> Gabriel
    * Adicionar API para cadastrar alocação e mudar status do motorista -> Lívia
  </details>

  <details>
    <summary>Como Administrador de frota, gostaria de editar e deletar a alocação de um veículo para um motorista.</summary>
            
    Tarefas:

    * Implementar opção de limpar a alocação na tela de alocação -> Gabriel
    * Implementar API para deletar alocação -> Lívia
  </details>
</details>
