package eventos_unig3.api.solicitacao;

import eventos_unig3.api.beneficiario.Beneficiario;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table( name = "solicitacoes" )


@Entity( name = "Solicitacao")


@Getter


@NoArgsConstructor


@EqualsAndHashCode(of = "id")


public class Solicitacao {


    @Id


    @GeneratedValue(strategy = GenerationType.IDENTITY)


    private long id;


    private String descricao;


    @Enumerated(EnumType.STRING)


    private StatusSolicitacao status;


    @ManyToOne


    @JoinColumn(name = "id_beneficiario")


    private Beneficiario beneficiario;


    public Solicitacao(DadosCadastroSolicitacao dados, Beneficiario beneficiario) {


        this.descricao = dados.descricao();


        this.status = dados.status();


        this.beneficiario = beneficiario;



    }


    public void atualizarInformacoes(DadosAtualizacaoSolicitacoes dados) {


        if (dados.descricao() != null) {


            this.descricao = dados.descricao();



        }


        if (dados.status() != null) {


            this.status = dados.status();



        }


    }



}