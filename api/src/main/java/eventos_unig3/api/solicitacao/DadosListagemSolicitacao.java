package eventos_unig3.api.solicitacao;
public record DadosListagemSolicitacao(String descricao, StatusSolicitacao status, Long idBeneficiario, String nomeBeneficiario) {


    public DadosListagemSolicitacao(Solicitacao solicitacao) {


        this(solicitacao.getDescricao(), solicitacao.getStatus(), solicitacao.getBeneficiario().getId(), solicitacao.getBeneficiario().getNome());


    }


}


