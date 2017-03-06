package vn.axonactive.internship_program.events_webservice.common;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.runners.MockitoJUnitRunner;
import vn.axonactive.internship_program.events_webservice.common.AES;

/**
 * Created by lmchuc on 1/4/2017.
 */
@RunWith(MockitoJUnitRunner.class)
public class AESTest {

    @InjectMocks
    private AES aes;


    @Test
    public void encrypt_ok(){

        String input = "le manh chuc";
        String result = "NWSYhvKGlzgcFSSTLv6xxA==";
        Assert.assertEquals(result,AES.encrypt(input));

    }

    @Test
    public void encrypt_notOk(){

        String input = "le manh chuc";
        String result = "NWSYhvKGlzgcFSSTLv6xxA==aaaa";
        Assert.assertNotEquals(result,AES.encrypt(input));

    }

    @Test
    public void decrypt_ok(){

        String input = "NWSYhvKGlzgcFSSTLv6xxA==";
        String result = "le manh chuc";
        Assert.assertEquals(result,AES.decrypt(input));

    }

    @Test
    public void decrypt_notOk(){

        String input = "NWSYhvKGlzgcFSSTLv6xxA==aaaa";
        String result = "le manh chuc";
        Assert.assertNotEquals(result,AES.decrypt(input));

    }

//    @Test(expected = NoSuchAlgorithmException.class)
//    public void setKey_NoSuchAlgorithmException(){
//        String inputString = "";
//        AES.setKey(inputString);
//
//    }
//
//    @Test(expected = UnsupportedEncodingException.class)
//    public void setKey_UnsupportedEncodingException(){
//        String inputString = "aaaaaabcfjhskjloi5613656543656536556////";
//        AES.setKey(inputString);
//
//    }
//
//    @Test(expected = NullPointerException.class)
//    public void encrypt_Exception(){
//        String inputString = "aaaaaabcfjhskjloi5613656543656536556////";
//        AES.encrypt(null);
//
//    }

}
