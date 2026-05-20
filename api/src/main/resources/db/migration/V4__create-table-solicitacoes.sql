create table solicitacoes(

    id bigint not null auto_increment,

    descricao varchar(255) not null,

    status varchar(100) not null,

    id_beneficiario bigint not null,

    primary key(id),

    constraint fk_solicitacoes_beneficiario
    foreign key(id_beneficiario)
    references beneficiarios(id)

);