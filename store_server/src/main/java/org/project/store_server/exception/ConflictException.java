package org.project.store_server.exception;

public class ConflictException extends RuntimeException{

   public ConflictException(String message){
        super(message);
    }

}
