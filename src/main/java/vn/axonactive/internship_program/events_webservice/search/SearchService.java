package vn.axonactive.internship_program.events_webservice.search;

import org.apache.lucene.search.Query;
import org.hibernate.search.jpa.FullTextEntityManager;
import org.hibernate.search.jpa.Search;
import org.hibernate.search.query.dsl.QueryBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import vn.axonactive.internship_program.events_webservice.entity.Enrollment;
import vn.axonactive.internship_program.events_webservice.entity.Event;
import vn.axonactive.internship_program.events_webservice.entity.User;
import vn.axonactive.internship_program.events_webservice.service.EnrollmentService;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.sql.PreparedStatement;
import java.util.Date;
import java.util.List;

/**
 * Created by dtnhat on 12/30/2016.
 */

@Repository
@Transactional
public class SearchService {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private EnrollmentService enrollmentService;

    public List<Event> searchEventByKeyword(String keywords){

        FullTextEntityManager fullTextEntityManager = Search.getFullTextEntityManager(entityManager);

        //create query buider
        QueryBuilder queryBuilder = fullTextEntityManager.getSearchFactory()
                .buildQueryBuilder().forEntity(Event.class).get();

        //basic query by keywords
        org.apache.lucene.search.Query filterByTitle_Des_Location_CatQuery = queryBuilder.keyword().fuzzy().withThreshold(.7f).withPrefixLength(1)
                .onFields("title","description","location","categories.typeName")
                .matching(keywords+"*")
                .createQuery();

        Date currentDate = new Date();
        Query filterByStartDateQuery = queryBuilder.range().onField("endDate").above(currentDate).excludeLimit().createQuery();


        //Query query = fullTextEntityManager.createNativeQuery("");
        Query integratedQuery = queryBuilder.bool()
                .must(filterByStartDateQuery)
                .must(filterByTitle_Des_Location_CatQuery)
                .createQuery();

        //wrap Lucence query in an Hibernate query object
        org.hibernate.search.jpa.FullTextQuery jpaQuery = fullTextEntityManager.createFullTextQuery(integratedQuery,Event.class);
        jpaQuery.setMaxResults(10);
        List<Event> events = jpaQuery.getResultList();

        return events;
    }

    public List<Enrollment> searchUserByKeyword(Long eventId, String keyword){

//        FullTextEntityManager fullTextEntityManager = Search.getFullTextEntityManager(entityManager);
//        //native query
//        String sqlString =  "select * " +
//                                "from awesomeevent.user as u,awesomeevent.enrollment as en " +
//                                "where en.event_id = "+eventId+
//                                " and u.id = en.user_id"+
//                                " and (u.email like '"+ keyword+"%'"+
//                                " or u.phone like '"+keyword+"%'"+
//                                " or en.authorization_code like '"+keyword+"%'"+
//                                " or u.full_name like '"+keyword+"%'"+
//                                ")";
//        javax.persistence.Query nativeQuery = fullTextEntityManager.createNativeQuery(sqlString);
//        nativeQuery.setMaxResults(10);
//        List<Enrollment> enrollments = nativeQuery.getResultList();
//        return enrollments;
        return  enrollmentService.findByEventIdAndByKeyword(eventId,keyword);
    }

//    public static void main(String []args){
//        Long eventId = 15L;
//        String keyword = "nhat";
//        String sqlString =  "select u.id,u.avatar,u.full_name,u.email,u.range_age,u.phone,en.authorization_code,en.check_in " +
//                "from awesomeevent.user as u,awesomeevent.enrollment as en " +
//                "where en.event_id = "+eventId+
//                " and u.id = en.user_id"+
//                " and (u.email like '"+ keyword+"%'"+
//                " or u.phone like '"+keyword+"%'"+
//                " or en.authorization_code like '"+keyword+"%'"+
//                " or u.full_name like '"+keyword+"%'"+
//                ")";
//        System.out.println(sqlString);
//    }
}