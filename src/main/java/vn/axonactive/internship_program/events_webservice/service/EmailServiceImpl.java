package vn.axonactive.internship_program.events_webservice.service;

import com.google.zxing.WriterException;
import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.VelocityEngine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import vn.axonactive.internship_program.events_webservice.common.CommonPath;
import vn.axonactive.internship_program.events_webservice.entity.Enrollment;
import vn.axonactive.internship_program.events_webservice.entity.Event;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.imageio.ImageIO;
import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.mail.util.ByteArrayDataSource;
import java.io.*;
import java.net.URISyntaxException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Properties;

@Service
public class EmailServiceImpl implements EmailService {

    private JavaMailSender javaMailSender;
    private VelocityEngine ve;
    private Properties p;


    @Autowired
    private EnrollmentService enrollmentService;

    @Autowired
    private EventService eventService;

    @Autowired
    private QRCodeService qrCodeService;

    @Autowired
    public EmailServiceImpl(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void veInit() {
        p = new Properties();
        p.setProperty("resource.loader", "class");
        p.setProperty("class.resource.loader.class", "org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader");
        ve = new VelocityEngine();
        ve.init(p);
    }

    @Async
    public void sendNotificationMailForTeam(String receptorEmail) throws MailException {
        veInit();
        VelocityContext context = new VelocityContext();
        Template t = ve.getTemplate("templates/emails/welcome_html.vm", "UTF-8");
        StringWriter writer = new StringWriter();
        t.merge(context, writer);

        System.out.println("Sending email...");
        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            mimeMessage.setFrom(new InternetAddress("admin@awesome.com", "Awesome Event"));
            mimeMessage.setRecipients(Message.RecipientType.TO,
                    InternetAddress.parse(receptorEmail));
            mimeMessage.setSubject("General Information for using Google, Facebook APIs");
            mimeMessage.setContent(writer.toString(), "text/html; charset=utf-8");
            javaMailSender.send(mimeMessage);
            System.out.println("Email Sent!");

        } catch (MessagingException e) {
            throw new RuntimeException(e);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
    }

    @Async
    public void sendWelcomeMailNewMember(String receptorEmail, String memberName) throws MailException {
        veInit();
        VelocityContext context = new VelocityContext();
        context.put("name", memberName);
        context.put("email", receptorEmail);
        Template t = ve.getTemplate("templates/emails/newRegister_html.vm", "UTF-8");
        StringWriter writer = new StringWriter();
        t.merge(context, writer);

        System.out.println("Sending email...");
        try {
            Session session = getSession();
            MimeMessage mimeMessage = new MimeMessage(session);
            mimeMessage.setFrom(new InternetAddress("admin@awesome.com", "Awesome Event"));
            mimeMessage.setRecipients(Message.RecipientType.TO,
                    InternetAddress.parse(receptorEmail));
            mimeMessage.setSubject("Thank you for joining Awesome Event");
            mimeMessage.setContent(writer.toString(), "text/html; charset=utf-8");
            javaMailSender.send(mimeMessage);
            System.out.println("Email Sent!");

        } catch (MessagingException e) {
            throw new RuntimeException(e);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
    }

    @Async
    public void sendForgotPasswordMail(String receptorEmail, String memberName, String newPassword, String link) throws MailException {
        veInit();
        VelocityContext context = new VelocityContext();
        context.put("name", memberName);
        context.put("email", receptorEmail);
        context.put("password", newPassword);
        context.put("link", link);

        Template t = ve.getTemplate("templates/emails/forgotPassword_html.vm", "UTF-8");
        StringWriter writer = new StringWriter();
        t.merge(context, writer);

        System.out.println("Sending email...");
        try {

            Session session = getSession();

            MimeMessage mimeMessage = new MimeMessage(session);
            mimeMessage.setFrom(new InternetAddress("admin@awesome.com", "Awesome Event"));
            mimeMessage.setRecipients(Message.RecipientType.TO,
                    InternetAddress.parse(receptorEmail));
            mimeMessage.setSubject("Your login details for Awesome Events");
            mimeMessage.setContent(writer.toString(), "text/html; charset=utf-8");
            Transport.send(mimeMessage);
            System.out.println("Email Sent!");

        } catch (MessagingException e) {
            throw new RuntimeException(e);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
    }

    @Async
    public void sendEmailTicket(String eventCode) {
        veInit();
        Enrollment enrollment = enrollmentService.findByAuthorizationCode(eventCode);
        VelocityContext context = new VelocityContext();
        context.put("name", enrollment.getUser().getFullName());
        context.put("evenName", enrollment.getEvent().getTitle());
        context.put("location", enrollment.getEvent().getLocation());
        context.put("startDate", new SimpleDateFormat("dd-MM-yyyy HH:mm").format(enrollment.getEvent().getStartDate()));
        try{
            context.put("endDate", new SimpleDateFormat("dd-MM-yyyy HH:mm").format(enrollment.getEvent().getEndDate()));
        }catch (NullPointerException e){
            context.put("endDate", "Undecided");
        }

        context.put("qrCode", enrollment.getAuthorizationCode());
        Template t = ve.getTemplate("templates/emails/ticketMail_html.vm", "UTF-8");
        StringWriter writer = new StringWriter();
        t.merge(context, writer);

        System.out.println("Sending email...");
        try {

            Session session = getSession();
            MimeMessage mimeMessage = new MimeMessage(session);
            mimeMessage.setFrom(new InternetAddress("admin@awesome.com", "Awesome Event"));
            mimeMessage.setRecipients(Message.RecipientType.TO,
                    InternetAddress.parse(enrollment.getUser().getEmail()));
            mimeMessage.setSubject("Your event ticket details for Awesome Events - " + enrollment.getEvent().getTitle());

            // This mail has 2 part, the BODY and the embedded image
            MimeMultipart multipart = new MimeMultipart("related");

            // first part (the html)
            BodyPart messageBodyPart = new MimeBodyPart();
            messageBodyPart.setContent(writer.toString(), "text/html;charset=utf-8");
            // add it
            multipart.addBodyPart(messageBodyPart);

//             ------------QR Code------------
            messageBodyPart = new MimeBodyPart();
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ImageIO.write(qrCodeService.createQRCodeBuffer(eventCode), "png", baos);
            DataSource fds = new ByteArrayDataSource(baos.toByteArray(), "image/*");
            messageBodyPart.setDataHandler(new DataHandler(fds));
            messageBodyPart.setHeader("Content-ID", "<image>");
            messageBodyPart.setFileName(eventCode + ".png");
            multipart.addBodyPart(messageBodyPart);

//            -------------- LOGO ----------------
            messageBodyPart = new MimeBodyPart();
            DataSource dsLogo = new FileDataSource(CommonPath.staticPath() + "/images/logo.png");
            messageBodyPart.setDataHandler(new DataHandler(dsLogo));
            messageBodyPart.setHeader("Content-ID", "<logo>");
            messageBodyPart.setFileName("logo.png");
            multipart.addBodyPart(messageBodyPart);

//            ---------------IMAGE EVENT------------------
            if (enrollmentService.findByAuthorizationCode(eventCode).getEvent().getImageCover() != null) {
                messageBodyPart = new MimeBodyPart();
                DataSource dsTicket = new FileDataSource(CommonPath.awsResource()+enrollmentService.findByAuthorizationCode(eventCode).getEvent().getImageCover());
                messageBodyPart.setDataHandler(new DataHandler(dsTicket));
                messageBodyPart.setHeader("Content-ID", "<banner>");
                messageBodyPart.setFileName("event.png");
                multipart.addBodyPart(messageBodyPart);
            }
            // put everything together
            mimeMessage.setContent(multipart);
            Transport.send(mimeMessage);
            System.out.println("Email Sent!");

        } catch (MessagingException e) {
            throw new RuntimeException(e);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (URISyntaxException e) {
            e.printStackTrace();
        } catch (WriterException e) {
            e.printStackTrace();
        }
    }

    private Session getSession() {

        final String username = "aws.terminal@gmail.com";
        final String password = "aavn@123";

        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");

        Session session = Session.getInstance(props,
                new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(username, password);
                    }
                });

        return session;
    }

    @Async
    public void sendEmailRemindTicket(String eventCode) {
        veInit();
        Enrollment enrollment = enrollmentService.findByAuthorizationCode(eventCode);
        VelocityContext context = new VelocityContext();
        context.put("name", enrollment.getUser().getFullName());
        context.put("evenName", enrollment.getEvent().getTitle());
        context.put("location", enrollment.getEvent().getLocation());
        context.put("startDate", new SimpleDateFormat("dd-MM-yyyy HH:mm").format(enrollment.getEvent().getStartDate()));
        try{
            context.put("endDate", new SimpleDateFormat("dd-MM-yyyy HH:mm").format(enrollment.getEvent().getEndDate()));
        }catch (NullPointerException e){
            context.put("endDate", "Undecided");
        }


        Template t = ve.getTemplate("templates/emails/remindMail_html.vm", "UTF-8");
        StringWriter writer = new StringWriter();
        t.merge(context, writer);

        System.out.println("Sending Email Reminder");
        try {

            Session session = getSession();
            MimeMessage mimeMessage = new MimeMessage(session);
            mimeMessage.setFrom(new InternetAddress("admin@awesome.com", "Awesome Event"));
            mimeMessage.setRecipients(Message.RecipientType.TO,
                    InternetAddress.parse(enrollment.getUser().getEmail()));
            mimeMessage.setSubject("Reminder: Your event registered for Awesome Events - " + enrollment.getEvent().getTitle());

            // This mail has 2 part, the BODY and the embedded image
            MimeMultipart multipart = new MimeMultipart("related");

            // first part (the html)
            BodyPart messageBodyPart = new MimeBodyPart();
            messageBodyPart.setContent(writer.toString(), "text/html;charset=utf-8");
            // add it
            multipart.addBodyPart(messageBodyPart);

//            -------------- LOGO ----------------
            messageBodyPart = new MimeBodyPart();
            DataSource dsLogo = new FileDataSource(CommonPath.staticPath() + "/images/logo.png");
            messageBodyPart.setDataHandler(new DataHandler(dsLogo));
            messageBodyPart.setHeader("Content-ID", "<logo>");
            messageBodyPart.setFileName("logo.png");
            multipart.addBodyPart(messageBodyPart);

//            ---------------IMAGE TICKET------------------
            if (enrollmentService.findByAuthorizationCode(eventCode).getEvent().getImageCover() != null) {
                messageBodyPart = new MimeBodyPart();
                DataSource dsTicket = new FileDataSource(CommonPath.awsResource()+enrollmentService.findByAuthorizationCode(eventCode).getEvent().getImageCover());
                messageBodyPart.setDataHandler(new DataHandler(dsTicket));
                messageBodyPart.setHeader("Content-ID", "<banner>");
                messageBodyPart.setFileName("banner.png");
                multipart.addBodyPart(messageBodyPart);
            }
            // put everything together
            mimeMessage.setContent(multipart);
            Transport.send(mimeMessage);
            System.out.println("Reminder Email Sent!");



        } catch (MessagingException e) {
            throw new RuntimeException(e);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
    }

    @Override
    @Async
    public void sendEmailCancelEvent(List<String> receptors, String owner, Long eventId) {

        veInit();

        Event event = eventService.getEventDetail(eventId);
        VelocityContext context = new VelocityContext();
        context.put("eventName", event.getTitle());
        context.put("startDate", new SimpleDateFormat("dd-MM-yyyy HH:mm").format(event.getStartDate()));

        Template t = ve.getTemplate("templates/emails/cancelEvent_html.vm", "UTF-8");
        StringWriter writer = new StringWriter();
        t.merge(context, writer);

        StringBuffer emails = new StringBuffer();

        if (receptors.size() > 0) {
            emails.append(receptors.get(0));
        }

        for (int i = 1; i < receptors.size(); i++) {
            emails.append("," + receptors.get(i));
        }

        System.out.println("Sending email...");
        try {
            Session session = getSession();

            MimeMessage mimeMessage = new MimeMessage(session);
            mimeMessage.setFrom(new InternetAddress("admin@awesome.com", "Awesome Event"));

            System.out.println("List Email: " + emails.toString());

            mimeMessage.setRecipients(Message.RecipientType.BCC, InternetAddress.parse(emails.toString()));
            mimeMessage.setRecipients(Message.RecipientType.CC, InternetAddress.parse(owner));
            mimeMessage.setSubject("[CANCELLATION OF EVENT] " + event.getTitle());

            MimeMultipart multipart = new MimeMultipart("related");

            BodyPart messageBodyPart = new MimeBodyPart();
            messageBodyPart.setContent(writer.toString(), "text/html;charset=utf-8");
            multipart.addBodyPart(messageBodyPart);

            messageBodyPart = new MimeBodyPart();
            DataSource dsLogo = new FileDataSource(CommonPath.staticPath() + "/images/logo.png");
            messageBodyPart.setDataHandler(new DataHandler(dsLogo));
            messageBodyPart.setHeader("Content-ID", "<logo>");
            messageBodyPart.setFileName("logo.png");
            multipart.addBodyPart(messageBodyPart);

            //---------------Event IMAGE------------------
            if (eventService.getEventDetail(eventId).getImageCover()!=null) {
                messageBodyPart = new MimeBodyPart();
                DataSource dsTicket = new FileDataSource(CommonPath.awsResource()+eventService.getEventDetail(eventId).getImageCover());
                messageBodyPart.setDataHandler(new DataHandler(dsTicket));
                messageBodyPart.setHeader("Content-ID", "<banner>");
                messageBodyPart.setFileName("banner.png");
                multipart.addBodyPart(messageBodyPart);
            }

            mimeMessage.setContent(multipart);
            Transport.send(mimeMessage);
            System.out.println("Email Sent!");

        } catch (MessagingException e) {
            throw new RuntimeException(e);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }

    }

    @Override
    @Async
    public void sendEmailReOpenEvent(List<String> receptors, String owner, Long eventId) {

        veInit();

        Event event = eventService.getEventDetail(eventId);
        VelocityContext context = new VelocityContext();
        context.put("eventName", event.getTitle());
        context.put("location", event.getLocation());
        context.put("startDate", new SimpleDateFormat("dd-MM-yyyy HH:mm").format(event.getStartDate()));
        try{
            context.put("endDate", new SimpleDateFormat("dd-MM-yyyy HH:mm").format(event.getEndDate()));
        }catch (NullPointerException e){
            context.put("endDate", "Undecided");
        }

        Template t = ve.getTemplate("templates/emails/reopenEvent_html.vm", "UTF-8");
        StringWriter writer = new StringWriter();
        t.merge(context, writer);

        StringBuffer emails = new StringBuffer();

        if (receptors.size() > 0) {
            emails.append(receptors.get(0));
        }

        for (int i = 1; i < receptors.size(); i++) {
            emails.append("," + receptors.get(i));
        }

        System.out.println("Sending email...");
        try {
            Session session = getSession();

            MimeMessage mimeMessage = new MimeMessage(session);
            mimeMessage.setFrom(new InternetAddress("admin@awesome.com", "Awesome Event"));

            System.out.println("List Email: " + emails.toString());

            mimeMessage.setRecipients(Message.RecipientType.BCC, InternetAddress.parse(emails.toString()));
            mimeMessage.setRecipients(Message.RecipientType.CC, InternetAddress.parse(owner));
            mimeMessage.setSubject("[RE-OPEN OF EVENT] " + event.getTitle());

            MimeMultipart multipart = new MimeMultipart("related");

            BodyPart messageBodyPart = new MimeBodyPart();
            messageBodyPart.setContent(writer.toString(), "text/html;charset=utf-8");
            multipart.addBodyPart(messageBodyPart);

            messageBodyPart = new MimeBodyPart();
            DataSource dsLogo = new FileDataSource(CommonPath.staticPath() + "/images/logo.png");
            messageBodyPart.setDataHandler(new DataHandler(dsLogo));
            messageBodyPart.setHeader("Content-ID", "<logo>");
            messageBodyPart.setFileName("logo.png");
            multipart.addBodyPart(messageBodyPart);

            //---------------Event IMAGE------------------
            if (eventService.getEventDetail(eventId).getImageCover()!=null) {
                messageBodyPart = new MimeBodyPart();
                DataSource dsTicket = new FileDataSource(CommonPath.awsResource()+eventService.getEventDetail(eventId).getImageCover());
                messageBodyPart.setDataHandler(new DataHandler(dsTicket));
                messageBodyPart.setHeader("Content-ID", "<banner>");
                messageBodyPart.setFileName("banner.png");
                multipart.addBodyPart(messageBodyPart);
            }

            mimeMessage.setContent(multipart);
            Transport.send(mimeMessage);
            System.out.println("Email Sent!");

        } catch (MessagingException e) {
            throw new RuntimeException(e);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }

    }


}