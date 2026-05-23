package eventos_unig3.api.beneficiario;

import com.fasterxml.jackson.annotation.JsonIgnore;
import eventos_unig3.api.contato.Contato;
import eventos_unig3.api.item.Item;
import eventos_unig3.api.solicitacao.Solicitacao;
import jakarta.persistence.*;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Table(name = "beneficiarios")


@Entity


@Getter


@NoArgsConstructor


@AllArgsConstructor

@EqualsAndHashCode(of = "id")


public class Beneficiario {


    @Id


    @GeneratedValue(strategy = GenerationType.IDENTITY)


    private long id;


    private String nome;


    @Embedded


    private Contato contato;


    @OneToMany(mappedBy = "beneficiario")


    @JsonIgnore


    private List<Solicitacao> solicitacoes;


    public Beneficiario(DadosCadastroBeneficiario dados) {


        this.nome = dados.nome();


        this.contato = new Contato(dados.contato());



    }


    public void atualizarInformacoes(@Valid DadosAtualizacaoBeneficiarios dados) {


        if (dados.nome() != null) {


            this.nome = dados.nome();



        }


        if (dados.contato() != null) {


            this.contato.atualizarInformacoes(dados.contato());



        }



    }



}