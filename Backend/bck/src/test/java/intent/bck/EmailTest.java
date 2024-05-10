package intent.bck;

import static org.junit.Assert.assertTrue;
import javax.mail.MessagingException;
import org.junit.Test;
public class EmailTest {

    @Test
    public void testGenerateUniqueId() {
        String uniqueId = EmailIdGenerator.generateUniqueId();
        assertTrue(uniqueId.matches("\\d{4}")); 
    }

    @Test
    public void testSendEmail() {
        String email = "test@example.com"; 
        String uniqueId = "1234";
        try {
            EmailSender.sendEmail(email, uniqueId);
            assertTrue(true);
        } catch (MessagingException e) {
            assertTrue(false); 
        }
    }
}