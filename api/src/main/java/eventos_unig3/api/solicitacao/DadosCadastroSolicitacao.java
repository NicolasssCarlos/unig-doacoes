package eventos_unig3.api.solicitacao;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DadosCadastroSolicitacao(


        @NotBlank


        String descricao,


        @NotBlank


        StatusSolicitacao status,


        @NotNull


        Long idBeneficiario



)


{



}
