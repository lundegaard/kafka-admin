package eu.lundegaard.sdp.backend.component;

import eu.lundegaard.sdp.backend.dto.MessageDto;
import eu.lundegaard.sdp.backend.dto.StatusEnum;

/**
 * @author Jozef Krcho (jozef.krcho@lundegaard.eu)
 */
public interface ProducerApi {

    StatusEnum sendMessage(MessageDto messageDto);
}
