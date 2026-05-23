package eventos_unig3.api.controller;

import eventos_unig3.api.beneficiario.*;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController


@RequestMapping("/beneficiarios")


public class BeneficiarioController {


    @Autowired


    private BeneficiarioRepository repository;


    @PostMapping


    @Transactional


    public void cadastrar(@RequestBody @Valid DadosCadastroBeneficiario dados) {


        repository.save(new Beneficiario(dados));



    }


    @GetMapping


    public Page<DadosListagemBeneficiario> listar(Pageable paginacao) {


        return repository.findAll(paginacao).map(DadosListagemBeneficiario::new);



    }


    @PutMapping


    @Transactional


    public void atualizar(@RequestBody @Valid DadosAtualizacaoBeneficiarios dados) {


        var beneficiario = repository.getReferenceById(dados.id());


        beneficiario.atualizarInformacoes(dados);



    }

    @DeleteMapping("/{id}")


    @Transactional


    public void deletar(@PathVariable Long id) {


        var beneficiario = repository.getReferenceById(id);


        repository.deleteById(id);


    }


}