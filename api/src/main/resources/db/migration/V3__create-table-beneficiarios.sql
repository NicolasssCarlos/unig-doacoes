create table beneficiarios(

    id bigint not null auto_increment,

    nome varchar(100) not null,

    email varchar(100) not null unique,

    telefone varchar(20) not null,


    primary key(id)

);