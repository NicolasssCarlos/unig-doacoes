package eventos_unig3.api.contato;

import eventos_unig3.api.doador.DadosCadastroDoador;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable


@Getter


@NoArgsConstructor


public class Contato {


    private String email;


    private String telefone;


    public Contato(DadosContato contato) {


        this.email = contato.email();


        this.telefone = contato.telefone();



    }


    public void atualizarInformacoes(DadosContato contato) {


        if (contato.email() != null) {


            this.email = contato.email();



        }


        if (contato.telefone() != null) {


            this.telefone = contato.telefone();



        }



    }


}