package eventos_unig3.api.item;

import eventos_unig3.api.doador.Doador;
import jakarta.persistence.*;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "itens")


@Entity(name = "Item")


@Getter


@NoArgsConstructor


@AllArgsConstructor


@EqualsAndHashCode(of = "id")


public class Item {


    @Id


    @GeneratedValue(strategy = GenerationType.IDENTITY)


    private long id;


    private String nome;


    private int quantidade;


    @Enumerated(EnumType.STRING)


    private StatusItem status;


    @ManyToOne


    @JoinColumn(name = "id_doador")


    private Doador doador;


    public Item(DadosCadastroItem dados, Doador doador) {


        this.nome = dados.nome();


        this.quantidade = dados.quantidade();


        this.status = dados.status();


        this.doador = doador;



    }


    public void atualizarInformacoes(@Valid DadosAtualizacaoItem dados) {


        if (dados.nome() != null) {


            this.nome = dados.nome();



        }

        if (dados.quantidade() != null) {


            this.quantidade = dados.quantidade();



        }


        if (dados.status() != null) {


            this.status = dados.status();



        }



    }



}