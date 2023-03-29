package edu.oswego.cs.dao;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProfanitySettings {
    HashSet<String> blockedWords;
    HashSet<String> acceptedWords;
}
