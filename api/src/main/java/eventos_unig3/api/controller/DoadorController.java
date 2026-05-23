package eventos_unig3.api.controller;

import eventos_unig3.api.doador.*;
import eventos_unig3.api.doador.DadosCadastroDoador;
import eventos_unig3.api.item.DadosListagemItem;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;


@RestController


@RequestMapping("/doadores")



public class DoadorController {


    @Autowired


    private DoadorRepository repository;


    @PostMapping


    @Transactional


    public void cadastrar(@RequestBody @Valid DadosCadastroDoador dados) {


        repository.save(new Doador(dados));



    }


    @GetMapping


    public Page<DadosListagemDoador> listar (Pageable paginacao) {


        return repository.findAll(paginacao).map(DadosListagemDoador::new);



    }


    @PutMapping


    @Transactional


    public void atualizar(@RequestBody @Valid DadosAtualizacaoDoadores dados) {


        var doador = repository.getReferenceById(dados.id());


        doador.atualizarInformacoes(dados);



    }


    @DeleteMapping("/{id}")


    @Transactional


    public void deletar(@PathVariable Long id) {


        repository.deleteById(id);



    }

}