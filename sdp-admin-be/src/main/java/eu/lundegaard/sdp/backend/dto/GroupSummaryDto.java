package eu.lundegaard.sdp.backend.dto;

import lombok.Data;

import java.util.List;

/**
 * @author Milan Hruban (milan.hruban@lundegaard.eu)
 */
@Data
public class GroupSummaryDto {
    private String state;

    private List<ConsumerDto> consumers;

    private String assignmentStrategy;

    private NodeDto Coordinator;
}
