# Recuperação do perfil,

**REQUISITOS FUNCIONAIS: DESCRIÇÃO DA FUNCIONALIDADE DENTRO DA PAGINA**
- O usuario deve poder recuperar a senha informando o seu email/
- O usuario deve receber um email com instruções para a recuperação de senha.
- O usuario deve poder resetar a sua senha.

**REQUISITOS NÃO FUNCIONAIS: AQUILO QUE NÃO TEM HAVER DIRETAMENTE COM AS FUNCIONALIDADES,QUESTÕES TECNICAS**
-Utilizar o mailtrap para testar envios em abiente de dev.
-Utilizar o amazon SES para envios em produção.
-O envio de emais deve ocorrer em segundo plano.


**REGRAS DE NEGÓCIO**
- O link enviado por email deve inspirar em duas horas.
- O usuario deve confirmar a nova senha para resetar a senha.


# Atualização do perfil

**RF**
- O usuário deve poder atualizar seu nome,email e senha;

**RN**
- O usuario não pode alterar seu email para um email já atualizado.
- Para atualizar sua senha o usuário deve informar a sua senha antiga.
- Para atualizar a sua senha o usuário precisa confirmar a nova senha.

# Painel do prestador

**RF**
    -O usuario deve listar seus agendamentos de um dia especifico;
    -O prestador de serviço deve receber uma notificação sempre que houver um novo agendamento;
    -O prestador de serviço deve poder visualizar as notificações não lidas.

**RNF**
    -Os agendamentos do prestador do dia deve ser armazenados em cache;
    -As notificações do prestador devem ser armazenadas no mongodb;
    -As notificações do prestador devem ser enviadas em tempo real com o socket.io

**RF**
    -A notificação deve ter um status de lida ou não lida para que o prestador possa controlar.

# Agendamento dos serviços 

**RF**
- O usuario deve poder listar todos os prestadores de serviço cadastrados;
- O usuario deve poder listar os dias do mês com pelo menos um horario disponivel ao prestador;
- O usuario deve poder listar horarios disponiveis em um dia especifico de um prestador;
- O usuario deve poder realizar um novo agendamento com um prestador;

**RNF**

**RN**
-Cada agendamento deve durar 1h exatamente
-Os agendamentos devem estar disponiveis das 8h as 18h (Primeiro as 8h e o ultimo as 17h)
-O usuario não pode agendar em um horario já ocupado
-O usuario nao pode marcar em um horario que já passou
-O usuario não pode agendar consigo mesmo.

