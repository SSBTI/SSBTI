package com.project.field.moss.domain;

import com.project.field.moss.domain.connection.Relationship;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

import org.hibernate.annotations.ColumnDefault;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
public class Mbti {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="mbti_id")
    private Long id;
    
    @Column(name="name")
    private String name;

    @Enumerated(EnumType.STRING)
    private MbtiType type;

    @Column(name="description", columnDefinition="TEXT")
    private String desc;

    @Column(name="count")
    @ColumnDefault("0")
    private int count;

    @OneToMany(mappedBy = "from", cascade = CascadeType.ALL)
    private List<Relationship> fromMbtis = new ArrayList<>();

    @OneToMany(mappedBy = "to", cascade = CascadeType.ALL)
    private List<Relationship> toMbtis = new ArrayList<>();

}
