package com.example.Calculator;
import org.springframework.util.*;


public class Calculate {

    //    double Operand=0 ,Result = 0;
    String s1="", s2="";
    boolean flag ;
    boolean R_flag;

    public String Operation(String operand1,String operand2,String operator){
        double num1=0,num2=0,Result=0;
        boolean flag1,flag2;
        this.s1=operand1;this.s2=operand2;

        num1 = getOperand(operand1);flag1=this.flag;
        num2 = getOperand(operand2);flag2=this.flag;
        if(flag1 && flag2){
            Result=getResult(num1,num2,operator);
            if(this.R_flag){
                return String.valueOf(Result);
            }
        }
        return "Error";
    }

    public double getOperand(String operand){
        int negative=0; double num=0;
        this.flag=true;

        if(operand.charAt(0)=='-'){
            negative=1;
        }

        if(operand.contains("%")){
            num = Double.parseDouble(operand.substring(1+negative,operand.length()-2));
            num /=100;
        }
        else if (operand.contains("/")) {
            num = Double.parseDouble(operand.substring(3+negative,operand.length()-1));
            if (num !=0){
                num =1/num;
            }
            else {
                this.flag=false;
            }
        }
        else if(operand.contains("²")){
            num = Double.parseDouble(operand.substring(1+negative,operand.length()-2));
            num=num*num;
        }
        else if(operand.contains("√")){
            num = Double.parseDouble(operand.substring(2+negative,operand.length()-1));
            if(num>=0){
                num=Math.sqrt(num);
            }
            else{
                this.flag=false;
            }
        }
        else{
            num = Double.parseDouble(operand);
            if(operand.charAt(0)=='-'){
                num *=-1;
            }
        }

        if(negative==1){
            num*=-1;
        }
        return num;
    }

    public Double getResult(double operand1,double operand2,String operator){
        this.R_flag=true;
        double result=0;
        switch (operator) {
            case "+":
                result = operand1 + operand2;
                break;
            case "-":
                result = operand1 - operand2;
                break;
            case "x":
                result = operand1 * operand2;
                break;
            case "÷":
                if (operand2 != 0) {
                    result = operand1 / operand2;
                } else {
                    this.R_flag = false;
                }
                break;
        }
        return result;
    }
}
