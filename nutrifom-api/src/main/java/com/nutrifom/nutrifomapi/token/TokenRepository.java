package com.nutrifom.nutrifomapi.token;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TokenRepository extends JpaRepository<Token, Integer> {

  @Query(value = """
      select t from Token t inner join AppUser u\s
      on t.appUser.id = u.id\s
      where u.id = :id and (t.expired = false or t.revoked = false)\s
      """)
  List<Token> findAllValidTokensByUser(Integer id);

  Optional<Token> findByToken(String token);
  void deleteByAppUserId(Integer userId);


}
