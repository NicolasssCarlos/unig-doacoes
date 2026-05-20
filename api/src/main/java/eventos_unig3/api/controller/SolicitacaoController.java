package eventos_unig3.api.controller;

import eventos_unig3.api.beneficiario.BeneficiarioRepository;
import eventos_unig3.api.solicitacao.DadosCadastroSolicitacao;
import eventos_unig3.api.solicitacao.DadosListagemSolicitacao;
import eventos_unig3.api.solicitacao.Solicitacao;
import eventos_unig3.api.solicitacao.SolicitacaoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController


@RequestMapping("/solicitacoes")


public class SolicitacaoController {


    @Autowired


    private SolicitacaoRepository repository;


    @Autowired


    private BeneficiarioRepository beneficiarioRepository;


    @PostMapping


    @Transactional


    public void cadastrar(@RequestBody DadosCadastroSolicitacao dados) {


        var beneficiario = beneficiarioRepository.getReferenceById(


                dados.idBeneficiario()


        );


        repository.save(new Solicitacao(dados, beneficiario));


    }


    @GetMapping


    public Page<DadosListagemSolicitacao> listar(Pageable paginacao) {


        return repository.findAll(paginacao).map(DadosListagemSolicitacao::new);


    }


}