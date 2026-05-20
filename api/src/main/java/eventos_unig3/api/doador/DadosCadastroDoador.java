package eventos_unig3.api.doador;

import eventos_unig3.api.contato.DadosContato;
import eventos_unig3.api.endereco.DadosEndereco;
import eventos_unig3.api.endereco.Endereco;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DadosCadastroDoador (


        @NotBlank


    String nome,


        @NotNull


    @Valid


    DadosContato contato,


        @NotNull


    @Valid


        DadosEndereco endereco






)


{



}
