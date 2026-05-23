package eventos_unig3.api.doador;

import eventos_unig3.api.contato.DadosContato;
import eventos_unig3.api.endereco.DadosEndereco;
import eventos_unig3.api.endereco.Endereco;

public record DadosAtualizacaoDoadores(Long id, String nome, DadosContato contato, DadosEndereco endereco) {



}
