package eventos_unig3.api.controller;

import eventos_unig3.api.doador.DoadorRepository;
import eventos_unig3.api.item.DadosCadastroItem;
import eventos_unig3.api.item.DadosListagemItem;
import eventos_unig3.api.item.Item;
import eventos_unig3.api.item.ItemRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.hibernate.cache.spi.support.AbstractReadWriteAccess;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;


@RestController


    @RequestMapping("/itens")


    public class ItemController {


        @Autowired


            private ItemRepository repository;


        @Autowired


            private DoadorRepository doadorRepository;


            @PostMapping


            @Transactional


            public void cadastrar(@RequestBody @Valid DadosCadastroItem dados) {


                var doador = doadorRepository.getReferenceById(


                        dados.idDoador()



                );


                repository.save(new Item(dados, doador));



            }


            @GetMapping


            public Page<DadosListagemItem> listar (Pageable paginacao) {


                return repository.findAll(paginacao).map(DadosListagemItem::new);



            }



        }

