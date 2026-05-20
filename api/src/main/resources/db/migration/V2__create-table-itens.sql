create table itens(

    id bigint not null auto_increment,

    nome varchar(100) not null,

    quantidade int not null,

    status varchar(50) not null,

    id_doador bigint not null,


    primary key(id),


    constraint fk_itens_doador
    foreign key(id_doador)
    references doadores(id)

);