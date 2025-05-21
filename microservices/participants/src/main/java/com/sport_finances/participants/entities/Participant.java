package com.sport_finances.participants.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name="participants")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Participant {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String name;

    private String email;

    private String phoneNumber;

    private String avatar;

    private String eventId;

    private Boolean status;

    private Date createDate;

    private Date updateDate;

}
