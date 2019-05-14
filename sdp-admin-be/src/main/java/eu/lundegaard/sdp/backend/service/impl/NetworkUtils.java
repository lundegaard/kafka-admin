package eu.lundegaard.sdp.backend.service.impl;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.Socket;

public final class NetworkUtils {
    private NetworkUtils() {}

    public static boolean ping(InetSocketAddress address, int timeout) {
        try (Socket socket = new Socket()){
            socket.connect(address, timeout);
            return true;
        } catch (IOException | RuntimeException e) {
            return false;
        }
    }

    public static boolean ping(InetSocketAddress address) {
        return ping(address, 0);
    }

    public static InetSocketAddress parse(String addressAsText) {
        String[] splitAddress = addressAsText.split(":");
        if (splitAddress.length != 2) {
            throw new IllegalArgumentException("Given address does not have port specified");
        }
        int port;
        try {
            port = Integer.parseInt(splitAddress[1]);
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Given address port is not a number");
        }
        String host = splitAddress[0];
        return new InetSocketAddress(host, port);
    }
}
