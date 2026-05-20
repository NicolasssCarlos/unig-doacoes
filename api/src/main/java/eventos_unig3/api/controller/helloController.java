package eventos_unig3.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController


@RequestMapping("/hello")


public class helloController {


    @GetMapping


    public String hello() {


        return "ola caralho";



    }



}