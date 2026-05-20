package eventos_unig3.api.beneficiario;

import eventos_unig3.api.contato.Contato;
import eventos_unig3.api.contato.DadosContato;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DadosCadastroBeneficiario(


        @NotBlank


        String nome,


        @NotNull


        DadosContato contato



)


{



}