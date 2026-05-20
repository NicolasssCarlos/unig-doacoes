package eventos_unig3.api.doador;

public record DadosListagemDoador(String nome, String email) {


    public DadosListagemDoador(Doador doador) {


        this(doador.getNome(), doador.getNome());



    }



}
