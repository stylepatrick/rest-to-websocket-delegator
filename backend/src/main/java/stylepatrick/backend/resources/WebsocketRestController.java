package stylepatrick.backend.resources;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import stylepatrick.backend.models.ConsumeMessageDto;
import stylepatrick.backend.models.ProduceMessageDto;

import java.util.Date;
import java.util.UUID;

@RestController
@RequestMapping("api")
@AllArgsConstructor
public class WebsocketRestController {

    private final SimpMessagingTemplate simpMessagingTemplate;

    @PostMapping("/consumer")
    public ResponseEntity<ProduceMessageDto> produceMessage(
            @RequestBody ConsumeMessageDto consumeMessageDto
    ) {
        String uuid = UUID.randomUUID().toString();
        ProduceMessageDto m = new ProduceMessageDto(uuid, consumeMessageDto.getUserId(), consumeMessageDto.getMessage() , new Date());
        simpMessagingTemplate.convertAndSend("/topic/message", m);
        return ResponseEntity.ok(m);
    }
}
