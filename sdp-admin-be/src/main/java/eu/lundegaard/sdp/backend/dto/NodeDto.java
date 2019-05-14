package eu.lundegaard.sdp.backend.dto;

import lombok.Data;

/**
 * @author Milan Hruban (milan.hruban@lundegaard.eu)
 */
@Data
public class NodeDto {

    private String id;

    private String host;

    private int port;

    private String rack;

}
