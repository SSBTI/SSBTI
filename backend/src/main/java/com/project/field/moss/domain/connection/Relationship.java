package com.project.field.moss.domain.connection;

import com.project.field.moss.domain.Mbti;
import com.project.field.moss.domain.RelationshipType;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
public class Relationship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "relationship_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name="from_id")
    private Mbti from;

    @ManyToOne
    @JoinColumn(name="to_id")
    private Mbti to;

    @Enumerated(EnumType.STRING)
    private RelationshipType type;
}
