package eventos_unig3.api.controller;

import eventos_unig3.api.beneficiario.BeneficiarioRepository;
import eventos_unig3.api.solicitacao.*;
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


    @PutMapping

    @Transactional


    public void atualizar(@RequestBody DadosAtualizacaoSolicitacoes dados) {


        var solicitacao = repository.getReferenceById(dados.id());


        solicitacao.atualizarInformacoes(dados);



    }


    @DeleteMapping("/{id}")


    @Transactional


    public void deletar(@PathVariable Long id) {


        repository.deleteById(id);



    }


}