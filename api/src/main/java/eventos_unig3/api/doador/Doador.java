package eventos_unig3.api.doador;

import com.fasterxml.jackson.annotation.JsonIgnore;
import eventos_unig3.api.contato.Contato;
import eventos_unig3.api.endereco.Endereco;
import eventos_unig3.api.item.Item;
import jakarta.persistence.*;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;


@Table(name = "doadores")


@Entity(name = "Doador")


@Getter


@NoArgsConstructor


@AllArgsConstructor


@EqualsAndHashCode(of = "id")


public class Doador {


    @Id


    @GeneratedValue(strategy = GenerationType.IDENTITY)


    private long id;


    private String nome;

    @Embedded


    private Contato contato;


    @Embedded


    private Endereco endereco;


    @OneToMany(mappedBy = "doador")


    @JsonIgnore


    private List<Item> itens;


    public Doador(DadosCadastroDoador dados) {


        this.nome = dados.nome();


        this.contato = new Contato(dados.contato());


        this.endereco = new Endereco(dados.endereco());



    }


    public void atualizarInformacoes(@Valid DadosAtualizacaoDoadores dados) {


        if (dados.nome() != null) {


            this.nome = dados.nome();



        }


        if (dados.contato() != null) {


            this.contato.atualizarInformacoes(dados.contato());



        }


        if (dados.endereco() != null) {


            this.endereco.atualizarInformacoes(dados.endereco());



        }



    }

    
}