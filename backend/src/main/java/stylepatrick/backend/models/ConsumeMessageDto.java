package stylepatrick.backend.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class ConsumeMessageDto {

    private String userId;
    private String message;
}
