package stylepatrick.backend.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class ProduceMessageDto {

    private String uuid;
    private String userId;
    private String message;
    private Date time;

}
