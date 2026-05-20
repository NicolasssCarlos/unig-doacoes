package eventos_unig3.api.endereco;

import jakarta.persistence.Embeddable;

@Embeddable

public class Endereco {


    private String logradouro;


    private String bairro;


    private String cep;


    private String numero;


    private String complemento;


    private String cidade;


    private String uf;


    public Endereco() {}


    public Endereco(DadosEndereco endereco) {


        this.logradouro = endereco.logradouro();


        this.bairro = endereco.bairro();


        this.cep = endereco.cep();


        this.numero = endereco.numero();


        this.complemento = endereco.complemento();


        this.cidade = endereco.cidade();


        this.uf = endereco.uf();



    }



}