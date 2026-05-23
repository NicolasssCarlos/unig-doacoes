package eventos_unig3.api.item;

import eventos_unig3.api.doador.DadosCadastroDoador;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record DadosCadastroItem(


        @NotBlank


        String nome,


        @NotNull


        @Positive


        Integer quantidade,


        @NotNull


        StatusItem status,


        @NotNull


        Long idDoador



)


{



}
