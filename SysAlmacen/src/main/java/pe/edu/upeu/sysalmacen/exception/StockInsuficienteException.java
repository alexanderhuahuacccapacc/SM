package pe.edu.upeu.sysalmacen.exception;

public class StockInsuficienteException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public StockInsuficienteException(String message) {
        super(message);
    }

    public StockInsuficienteException(String message, Throwable cause) {
        super(message, cause);
    }

}
