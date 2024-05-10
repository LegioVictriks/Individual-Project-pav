package intent.bck;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

public class EmailSender {

    public static void sendEmail(String email, String uniqueId) throws MessagingException {

        Properties properties = new Properties();
        properties.put("mail.smtp.host", "smtp.example.com");
        properties.put("mail.smtp.port", "587");
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.starttls.enable", "true");

       
        String username = "your-email@example.com";
        String password = "your-email-password";

        Session session = Session.getInstance(properties, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username, password);
            }
        });


        Message message = new MimeMessage(session);
        message.setFrom(new InternetAddress(username));
        message.setRecipient(Message.RecipientType.TO, new InternetAddress(email));
        message.setSubject("Your Unique ID");
        message.setText("Your unique ID is: " + uniqueId);

 
        Transport.send(message);
    }

    public static void main(String[] args) {
        String email = "recipient@example.com";
        String uniqueId = EmailIdGenerator.generateUniqueId();
        try {
            sendEmail(email, uniqueId);
            System.out.println("Email sent successfully!");
        } catch (MessagingException e) {
            System.out.println("Failed to send email: " + e.getMessage());
        }
    }
}