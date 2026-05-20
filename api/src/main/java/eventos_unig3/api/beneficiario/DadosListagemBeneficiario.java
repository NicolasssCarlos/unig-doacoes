package eventos_unig3.api.beneficiario;

import eventos_unig3.api.contato.Contato;

public record DadosListagemBeneficiario(String nome, Contato contato) {


    public DadosListagemBeneficiario(Beneficiario beneficiario) {


        this(beneficiario.getNome(), beneficiario.getContato());



    }



}


