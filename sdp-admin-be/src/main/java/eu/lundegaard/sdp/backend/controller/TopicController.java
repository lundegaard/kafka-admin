package eu.lundegaard.sdp.backend.controller;

import eu.lundegaard.sdp.backend.dto.*;
import eu.lundegaard.sdp.backend.dto.ProduceMessageDto;
import eu.lundegaard.sdp.backend.service.TopicService;
import org.apache.kafka.common.TopicPartition;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;
import java.util.Set;

/**
 * @author Jozef Krcho (jozef.krcho@lundegaard.eu)
 */
@RestController
@RequestMapping("/admin/topics")
public class TopicController {

    private static final Logger LOG = LoggerFactory.getLogger(TopicController.class);

    @Autowired
    private TopicService topicService;

    @CrossOrigin
    @RequestMapping(method = RequestMethod.POST)
    public void createTopic(@RequestBody Topic topic, HttpServletRequest req) {
        LOG.info("Creating topic in Kafka: {}", topic.getName());
        topicService.createTopic(topic.getName(), topic.getPartitions(), topic.getReplicationFactor());
    }

    @CrossOrigin
    @RequestMapping(method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteTopic(@RequestBody Topic topic, HttpServletRequest req) {
        LOG.info("Deleting topic in Kafka: {}", topic.getName());
        StatusEnum status = topicService.deleteTopic(topic.getName());
        return getResponseEntity(status);
    }

    @CrossOrigin
    @RequestMapping(method = RequestMethod.GET)
    public Set<String> listTopics() {
        LOG.info("Getting kafka topics list from AdminClient.");
        return topicService.listTopics();
    }

    @CrossOrigin
    @RequestMapping(method = RequestMethod.GET, path = "/details")
    public List<TopicDetailsDto> listTopicsDetails() {
        LOG.debug("Getting kafka topics detail list from consumer.");
        return topicService.listTopicsDetails();
    }

    @CrossOrigin
    @RequestMapping(method = RequestMethod.POST, path = "/messages")
    public List<MessageDto> getPartitionMessages(@RequestBody MessagesRequest messagesRequest, HttpServletRequest req) {
        LOG.info("Getting {} messages from topic: {}, partition: {}.", messagesRequest.getNumber(),
                messagesRequest.getTopic(), messagesRequest.getPartition());
        return topicService.getPartitionMessages(
                new TopicPartition(messagesRequest.getTopic(), messagesRequest.getPartition()),
                messagesRequest.getOffset(),
                messagesRequest.getNumber());
    }

    @CrossOrigin
    @RequestMapping(method = RequestMethod.PUT, path = "/config/update")
    public ResponseEntity<?> updateTopicConfig(@RequestBody ConfigTopicUpdateDto configTopicUpdateDto) {
        LOG.info("Updating {} configuration with value {} in topic: {}.", configTopicUpdateDto.getName(),
                configTopicUpdateDto.getValue(), configTopicUpdateDto.getTopic());
        ConfigTopicUpdateResult result = topicService.updateTopicConfig(configTopicUpdateDto);
        if (result.getStatusEnum() == StatusEnum.OK) {
            return ResponseEntity.ok().body(result.getConfigDtoList());
        }
        return getResponseEntity(result.getStatusEnum());
    }

    @CrossOrigin
    @RequestMapping(method = RequestMethod.POST, path = "/send")
    public ResponseEntity<?> sendMessage(@Valid @RequestBody ProduceMessageDto produceMessageDto) {
        LOG.info("Sending message to kafka: topic={} key={} value={} .",
                produceMessageDto.getTopic(), produceMessageDto.getKey(),
                produceMessageDto.getValue());
        MessageDto messageDto = new MessageDto()
                .setTopic(produceMessageDto.getTopic())
                .setKey(produceMessageDto.getKey())
                .setValue(produceMessageDto.getValue());
        StatusEnum result = topicService.sendMessage(messageDto);
        return getResponseEntity(result);
    }

    private ResponseEntity<?> getResponseEntity(StatusEnum statusEnum) {
        switch (statusEnum) {
            case OK:
                return ResponseEntity.ok().build();
            case NOT_FOUND:
                return ResponseEntity.notFound().build();
            case REQUEST_TIMEOUT:
                return ResponseEntity.status(HttpStatus.REQUEST_TIMEOUT).build();
            case BAD_REQUEST:
            default:
                return ResponseEntity.badRequest().build();
        }
    }
}
