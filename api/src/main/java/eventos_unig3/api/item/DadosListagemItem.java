package eventos_unig3.api.item;

import eventos_unig3.api.doador.Doador;

public record DadosListagemItem(String nome, int quantidade, StatusItem status, Long idDoador, String nomeDoador) {


    public DadosListagemItem(Item item) {


       this(item.getNome(), item.getQuantidade(), item.getStatus(), item.getDoador().getId(), item.getDoador().getNome());



    }


}
