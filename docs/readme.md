# Core Services

Modulo onde são implementados os serviços de negócio da aplicação.

## Property

> Serviço para gerenciamento de propriedades, esse serviço é acessado apenas pelo **ApolloService** e não deve ser acessado diretamente. Abaixo segue todos os agregados que o serviço **Property** possui.

### Propiedade

#### Create

- Permission
  - can_create_property
- Input
  - name
    - type: string
    - required: true
    - max_length: 50
    - min_length: 3
  - description
    - type: string
    - required: true
    - max_length: 500
    - min_length: 3
- Output
  - id
    - type: nanoid
  - name
    - type: string
  - description
    - type: string
  - created_at
    - type: datetime
  - updated_at
    - type: datetime
- Business Rules
  - A propriedade deve ser criada com o status **PENDING**
  - O nome da propiedade será gerado automaticamente com o seguinte formato: **[nome do usuário] - [nome da propriedade]**
- Events
  - property_created

#### Update

- Permission: can_update_property
- Notificar o usuario que a propriedade foi editada

#### Change Status

- Permission: can_change_status_property
- Notificar o usuario que a propriedade foi desativada

#### Search

- Permission: can_get_property

#### Get

- Permission: can_search_property

#### Change Status

- Permission: can_change_status_property
- Essa ação só poderá ser feita se o cadastro estiver em analise
- Notificar o usuario que a propriedade teve o status alterado

#### Request Change

- Permission: can_request_change_property
- Essa ação só poderá ser feita se o cadastro estiver em analise
- Notificar o usuario que a propriedade foi solicitada para alteração

### Tipo de propriedade

#### Create

- Permission: can_create_property_type

#### Update

- Permission: can_update_property_type

#### Delete

- Permission: can_delete_property_type
- Somente se não houver propriedades vinculadas

#### Search

- Permission: can_get_property_type

#### Get

- Permission: can_search_property_type

#### Get All

- Permission: can_list_property_type

### tipo de privacidade

#### Create

- Permission: can_create_privacy_type

#### Update

- Permission: can_update_privacy_type

#### Delete

- Permission: can_delete_privacy_type
- Somente se não houver propriedades vinculadas

#### Search

- Permission: can_get_privacy_type

#### Get

- Permission: can_search_privacy_type

#### Get All

- Permission: can_list_privacy_type

### Relacionamento com propriedade

#### Create

- Permission: can_create_property_relationship

#### Update

- Permission: can_update_property_relationship

#### Delete

- Permission: can_delete_property_relationship
- Somente se não houver propriedades vinculadas

#### Search

- Permission: can_get_property_relationship

#### Get

- Permission: can_search_property_relationship

#### Get All

- Permission: can_list_property_relationship

### Detalhes da propriedade

#### Create

- Permission: can_create_property_detail

#### Update

- Permission: can_update_property_detail

#### Delete

- Permission: can_delete_property_detail
- On Delete Cascade

#### Search

- Permission: can_get_property_detail

#### Get

- Permission: can_search_property_detail

#### Get All

- Permission: can_list_property_detail

### Detalhes do condomínio

#### Create

- Permission: can_create_condominium_detail

#### Update

- Permission: can_update_condominium_detail

#### Delete

- Permission: can_delete_condominium_detail
- On Delete Cascade

#### Search

- Permission: can_get_condominium_detail

#### Get

- Permission: can_search_condominium_detail

#### Get All

- Permission: can_list_condominium_detail

### Regras da propriedade/condomínio

#### Create

- Permission: can_create_property_rule

#### Update

- Permission: can_update_property_rule

#### Delete

- Permission: can_delete_property_rule
- On Delete Cascade

#### Search

- Permission: can_get_property_rule

#### Get

- Permission: can_search_property_rule

#### Get All

- Permission: can_list_property_rule

## Auth

> Serviço para gerenciamento de autenticação, os atores que consumirão esse serviço terão as seguintes funcionalidades:

### Usuário

#### Create

- Permission: can_create_user

#### Update

- Permission: can_update_user

#### Search

- Permission: can_get_user

#### Get

- Permission: can_search_user

#### Reset Password

- Permission: can_reset_password_user`

#### Change Status

- Permission: can_change_user_status
- Status: enabled, disabled, pending

### Permissões

#### Create

- Permission: can_create_permission

#### Update

- Permission: can_update_permission

#### Search

- Permission: can_get_permission

#### Get

- Permission: can_search_permission

#### Get All

- Permission: can_list_permission

#### Delete

- Permission: can_delete_permission
- Somente se não houver usuários vinculados

### Funções

#### Create

- Permission: can_create_role

#### Update

- Permission: can_update_role

#### Search

- Permission: can_get_role

#### Get

- Permission: can_search_role

#### Get All

- Permission: can_list_role

#### Delete

- Permission: can_delete_role
- Somente se não houver usuários vinculados

## Schedule

> Serviço para gerenciamento de agendamentos, os atores que consumirão esse serviço terão as seguintes funcionalidades:

### Agendamento

#### Create

- Permission: can_create_schedule

#### Update

- Permission: can_update_schedule

#### Search

- Permission: can_get_schedule

#### Get

- Permission: can_search_schedule
- Aprovar agendamento
  - Permission: can_approve_schedule
- Cancelar agendamento
  - Permission: can_cancel_schedule

## Report

> Serviço para reportar anúncios, os atores que consumirão esse serviço terão as seguintes funcionalidades:

### Report

#### Create

- Permission: can_create_report
- Ao criar um report, o usuário que criou o report será notificado e o status do report será "pending"

#### Search

- Permission: can_get_report

#### Get

- Permission: can_search_report

#### Change Status

- Permission: can_change_report_status
