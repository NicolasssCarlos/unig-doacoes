package eventos_unig3.api.contato;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record DadosContato(


        @NotBlank


        @Email


        String email,


        @NotBlank


        String telefone


)


{



}
