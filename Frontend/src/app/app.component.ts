import { NumberSymbol } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ReturnStatement } from '@angular/compiler';
import { Component, Input } from '@angular/core';
import { Injectable } from "@angular/core";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './bootstrap.css']
})

export class AppComponent {

  constructor(private http: HttpClient) { }

  operand1: string = '';
  operand2: string = '';
  operator: string = '';
  input: string = '';
  input2: string = '0';
  op: string = '';
  in: string = '';
  result: string = '0';
  c: number = 0; o: number = 0;

  send(x: string, y: string, z: string, equal: string) {
    this.http.get('http://localhost:8080/print/expression', {
      responseType: "text",
      params: {
        first: x,
        second: y,
        third: z
      },
      observe: 'response'
    }).subscribe(response => {
      this.operand1 = response.body!
      this.input = response.body!

      if (this.input.charAt(this.input.length - 1) == '0' && this.input.charAt(this.input.length - 2) == '.') {
        this.input = this.input.slice(0, -2);
      }
      this.input2 = this.input;

      if (this.input == "Error!") {
        this.in = this.in + "!";
        this.input2 = this.input;
        this.result = ""; this.input = "";
        this.c = 0;
        this.operand1 = ""; this.operand2 = ""; this.operator = "";
      }
      else if (equal == "=") {
        this.input2 = this.input;
        this.input = "";
      }
      else {
        this.input = this.input + this.op;
        this.operand2 = "";
      }
    })
  }

  display(equal: string) {
    this.result = ''; this.o = 1;
    this.send(this.operand1, this.operand2, this.operator, equal);
  }

  //remove 0s from the end
  getinput() {
    if (this.operand1.charAt(this.operand1.length - 1) == '0' && this.operand1.charAt(this.operand1.length - 2) == '.') {
      this.input = this.operand1.slice(0, -2) + this.operator + this.operand2;
    } else {
      this.input = this.operand1 + this.operator + this.operand2;
    }
  }

  press(btn: string) {

    if (this.in.charAt(this.in.length - 1) == "!") {
      if (btn != "0" && btn != "1" && btn != "2" && btn != "3" && btn != "4" && btn != "5" && btn != "6" && btn != "7" && btn != "8" && btn != "9" && btn != "C" && btn != "CE" && btn != "=" && btn != "del") {
        return;
      }
      else {
        this.in = this.in.slice(0, -1);
      }
    }

    if (this.in.charAt(this.in.length - 1) == "e") {
      if (btn == "0" || btn == "1" || btn == "2" || btn == "3" || btn == "4" || btn == "5" || btn == "6" || btn == "7" || btn == "8" || btn == "9" || btn == ".") {
        this.result = ""; this.input = ""; this.in = "";
        this.c = 0; this.o = 0;
        this.input2 = "0";
        this.operand1 = ""; this.operand2 = ""; this.operator = "";
      } else if (btn == "=") {
        return;
      } else {
        this.c = 0; this.o = 0;
        if (this.operand1.charAt(this.operand1.length - 1) == '0' && this.operand1.charAt(this.operand1.length - 2) == '.') {
          this.input = this.operand1.slice(0, -2);
        } else {
          this.input = this.operand1;
        }
        this.operand1 = this.input;
      }
      this.in = this.in.slice(0, -1);
    }

    if (this.operand1 != "" && this.operand2 != "" && this.operator != "" && (btn == "-" || btn == "+" || btn == "÷" || btn == "x")) {

      this.display("==");
      this.operand1 = ""; this.operand2 = ""; this.operator = "";
      this.c = 1;
    }

    if (this.operand1.charAt(this.operand1.length - 1) == ")" || this.operand1.charAt(this.operand1.length - 1) == "%" || this.operand1.charAt(this.operand1.length - 1) == "²") {
      if (this.operand2 == "" && this.input2 != "0" && (btn == "x^2" || btn == "%" || btn == "x^0.5" || btn == "1/x")) {
        return;
      }
      if (btn == "0" || btn == "1" || btn == "2" || btn == "3" || btn == "4" || btn == "5" || btn == "6" || btn == "7" || btn == "8" || btn == "9" || btn == ".") {
        if (this.c == 0) {
          this.operand1 = "";
          this.input = "";
        }
      }

    }

    if (this.operand2.charAt(this.operand2.length - 1) == ")" || this.operand2.charAt(this.operand2.length - 1) == "%" || this.operand2.charAt(this.operand2.length - 1) == "²") {
      if ((btn == "x^2" || btn == "%" || btn == "x^0.5" || btn == "1/x")) {
        return;
      }
      if (btn == "0" || btn == "1" || btn == "2" || btn == "3" || btn == "4" || btn == "5" || btn == "6" || btn == "7" || btn == "8" || btn == "9" || btn == ".") {
        if (this.c == 1) {
          this.operand2 = "";
          this.input2 = "";
          this.getinput();
        }
      }
    }

    if (btn == "+/-") {
      if (this.input2 == "0" || this.input2 == "0.") {
        return;
      }
      if (this.c == 0 && this.operand1 == "") {
        return;
      } else if (this.c == 1 && this.operand2 == "") {
        if (this.operand1.charAt(this.operand1.length - 1) == '0' && this.operand1.charAt(this.operand1.length - 2) == '.') {
          this.operand2 = (this.operand1.slice(0, -1)).slice(0, -1);
          this.input2 = this.operand2;
          this.input = this.operand1.slice(0, -2) + this.operator + this.operand2;
        } else {
          this.operand2 = this.operand1;
          this.input2 = this.operand2;
          this.input = this.operand1 + this.operator + this.operand2;
        }
      }
    }

    if (btn == "+" || btn == "÷" || btn == "x" || btn == "-") {
      if (this.operand1 == "") {
        this.operand1 = "0";
        this.input = "0";
      } else if (this.input2 == "0" && this.c == 1) {
        this.operand2 = "0"; this.display("==");
      } else if (this.operand2 == "" && this.c == 1) {
        this.input = this.input.slice(0, -1);
      }
      this.c = 1;
      this.operator = btn;
      this.input = this.input + btn;
      this.op = btn;
    }
    else if (btn == "1/x") {
      if (this.c == 0) {
        if (this.operand1 == "") {
          this.operand1 = "0";
        }
        this.operand1 = "1/(" + this.operand1 + ")";
        this.input2 = this.operand1;
      }
      else {
        if (this.operand2 == '') {
          if (this.o == 0) {
            this.operand2 = this.input2;
          } else {
            this.operand2 = this.input2;
          }
        }
        this.operand2 = "1/(" + this.operand2 + ")";
        this.input2 = this.operand2;
      }
      this.getinput();
    }
    else if (btn == "x^2") {
      if (this.c == 0) {
        if (this.operand1 == "") {
          this.operand1 = this.input2;
        }
        this.operand1 = "(" + this.operand1 + ")²";
        this.input2 = this.operand1;

      } else {

        if (this.operand2 == "") {
          this.operand2 = this.input2;
        }

        this.operand2 = "(" + this.operand2 + ")²";
        this.input2 = this.operand2;
      }
      this.getinput();
    }
    else if (btn == "x^0.5") {
      if (this.c == 0) {
        if (this.operand1 == "") {
          this.operand1 = "0";
        }
        this.operand1 = "√(" + this.operand1 + ")";
        this.input2 = this.operand1;
      } else {
        if (this.operand2 == "") {
          if (this.o == 0) {
            this.operand2 = this.input2;
          } else {
            this.operand2 = this.input2;
          }
        }
        this.operand2 = "√(" + this.operand2 + ")";
        this.input2 = this.operand2;
      }
      this.getinput();
    }
    else if (btn == "%") {
      if (this.c == 0) {
        if (this.operand1 == "") {
          this.operand1 = "0";
        }
        this.operand1 = "(" + this.operand1 + ")%";
        this.input2 = this.operand1;
      } else {
        if (this.operand2 == "") {
          this.operand2 = this.input2;
        }
        this.operand2 = "(" + this.operand2 + ")%";
        this.input2 = this.operand2;
      }
      this.getinput();
    }
    else if (btn == "CE") {
      if (this.c == 0 && this.operator == "") {
        this.operand1 = "";
      } else if (this.operand2 != "") {
        this.operand2 = "";
      }

      this.input2 = "0";
      this.getinput();
      this.in = this.in.slice(0, -1);
    }
    else if (btn == "C") {
      this.result = ""; this.input = "";
      this.in = "";
      this.c = 0; this.o = 0;
      this.input2 = "0";
      this.operand1 = ""; this.operand2 = ""; this.operator = "";
    }
    else if (btn == "del") {
      if (this.c == 0 && this.operator == "") {
        if (this.operand1.charAt(this.operand1.length - 1) == ")" || this.operand1.charAt(this.operand1.length - 1) == "%" || this.operand1.charAt(this.operand1.length - 1) == "²") {
          return;
        }
        this.operand1 = this.operand1.slice(0, -1);
        if (this.operand1 == "") {
          this.input2 = "0";
        } else {
          this.input2 = this.operand1;
        }
        this.input = this.input.slice(0, -1);
        this.in = this.in.slice(0, -1);
      } else if (this.operand2 != "") {
        if (this.operand2.charAt(this.operand2.length - 1) == ")" || this.operand2.charAt(this.operand2.length - 1) == "%" || this.operand2.charAt(this.operand2.length - 1) == "²") {
          return;
        }
        this.operand2 = this.operand2.slice(0, -1);
        if (this.operand2 == "") {
          this.input2 = "0";
        } else {
          this.input2 = this.operand2;
        }
        this.input = this.input.slice(0, -1);
        this.in = this.in.slice(0, -1);
      }
      this.getinput();
    }
    else if (btn == "=") {
      if (this.operand1 == "") {
        this.operand1 = "0";
      }
      if (this.operand2 == "" && this.operator == "") {
        this.operand2 = "0"; this.operator = "+";
      }
      if (this.operand2 == "" && this.operator != "") {
        this.operand2 = this.input2;
      }
      this.in = this.in + "e";
      this.display("=");
      this.operand1 = ""; this.operand2 = ""; this.operator = ""; this.input = "";
    }
    else if (btn == "+/-") {
      if (this.c == 0) {
        if (this.operand1.charAt(0) == "-") {
          this.operand1 = this.operand1.slice(1);
          this.input2 = this.operand1;
        } else {
          this.operand1 = "-" + this.operand1;
          this.input2 = this.operand1;
        }
        this.input = this.operand1;
      } else {
        if (this.operand2.charAt(0) == "-") {
          this.operand2 = this.operand2.slice(1);
          this.input2 = this.operand2;
        } else {
          this.operand2 = "-" + this.operand2;
          this.input2 = this.operand2;
        }
        this.getinput();
      }


    }
    else {
      if (this.c == 0) {
        if (btn == "." && this.operand1 == "") {
          this.operand1 = "0"; this.input = this.input + "0";
        }
        this.operand1 = this.operand1 + btn;
        this.input2 = this.operand1;
      } else {
        if (btn == "." && this.operand2 == "") {
          this.operand2 = "0"; this.input = this.input + "0";
        }
        this.operand2 = this.operand2 + btn;
        this.input2 = this.operand2;
      }
      this.input = this.input + btn;
    }
  }
}
