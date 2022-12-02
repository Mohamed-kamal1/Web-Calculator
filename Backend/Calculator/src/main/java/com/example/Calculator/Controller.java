package com.example.Calculator;

import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins="http://localhost:4200/")
@RequestMapping("/print")
public class Controller {
    @GetMapping("/expression")
    public String calculate(@RequestParam String first, @RequestParam String second, @RequestParam String third) {
        return calc.Operation(first, second, third);

    }

    Calculate calc = new Calculate() ;
}
