package org.project.store_server.exception;

public class InsufficientAmountException extends RuntimeException{

    public InsufficientAmountException(String message){
        super(message);
    }
}
