package vn.axonactive.internship_program.events_webservice.service;

import org.apache.commons.lang.time.DateUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import vn.axonactive.internship_program.events_webservice.common.CommonPath;
import vn.axonactive.internship_program.events_webservice.common.ImageProcessing;
import vn.axonactive.internship_program.events_webservice.common.PixelCrop;

import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.Date;

/**
 * Created by lmchuc on 1/17/2017.
 */
@Service
public class ImageServiceImpl implements ImageService {
    @Override
    public String uploadImageEventReturnImageName(MultipartFile file, Long idEvent, PixelCrop pixelCrop) throws IOException {
        String fileName = file.getOriginalFilename();
        BufferedImage originalImage = ImageIO.read(file.getInputStream());
        String imageName = idEvent + ".png";
        Path path = Paths.get(CommonPath.imagesPath() + "/events/" + imageName);
        ImageIO.write(ImageProcessing.resizeImageScalr(ImageProcessing.cropImageScalr(originalImage, pixelCrop.getX(), pixelCrop.getY(), pixelCrop.getWidth(), pixelCrop.getHeight()), ImageProcessing.EVENT_WIDTH, ImageProcessing.EVENT_HEIGHT), "png", new File(CommonPath.imagesPath() + "/events/" + imageName));
        return imageName;
    }

    @Override
    public void createImage(HttpServletResponse response, String imagePath, int dWidth, int dHeight) throws IOException {
        if (Files.exists(Paths.get(imagePath))) {
            BufferedImage originalImage = ImageIO.read(Files.newInputStream(Paths.get(imagePath)));
            BufferedImage resizeImagePng = ImageProcessing.resizeImageScalr(originalImage,dWidth,dHeight);
            ByteArrayOutputStream pngOutputStream = new ByteArrayOutputStream();
            ImageIO.write(resizeImagePng, "jpg", pngOutputStream);
            byte[] imgByte = pngOutputStream.toByteArray();
            response.setHeader("Cache-Control", "public");
            response.setDateHeader("Expires", DateUtils.addDays(new Date(), 1).getTime());
            response.setContentType("image/jpeg");
            ServletOutputStream responseOutputStream = response.getOutputStream();
            responseOutputStream.write(imgByte);
            responseOutputStream.flush();
            responseOutputStream.close();
        } else response.setStatus(404);
    }

    @Override
    public String uploadImageCreateSpeakerReturnImageName(MultipartFile file) throws IOException {
        String identify = Long.toString(new Date().getTime());
        String originalName = file.getOriginalFilename();
        String extension = originalName.substring(originalName.lastIndexOf(".")+1,originalName.length());
        String fileName = identify+"."+extension;
        BufferedImage originalImage= ImageIO.read(file.getInputStream());
        int width = originalImage.getWidth();
        int height = originalImage.getHeight();
        int base = width > height ? height : width;
        ImageIO.write(ImageProcessing.resizeImageScalr(ImageProcessing.cropImageScalr(originalImage, width/2 - base/2, height/2 - base/2, base, base),100, 100),"png", new File(CommonPath.imagesPath() + "/speakers/"+fileName));
        return fileName;
    }

    @Override
    public String uploadImageUpdateSpeakerReturnImageName(MultipartFile file, String url) throws IOException {
        this.deleteImageSpeaker(url);
        String identify = Long.toString(new Date().getTime());
        String originalName = file.getOriginalFilename();
        String extension = originalName.substring(originalName.lastIndexOf(".")+1,originalName.length());
        String fileName = identify+"."+extension;
        Path imagePath = Paths.get(CommonPath.imagesPath() + "/speakers/"+fileName);
        BufferedImage originalImage= ImageIO.read(file.getInputStream());
        int width = originalImage.getWidth();
        int height = originalImage.getHeight();
        int base = width > height ? height : width;
        ImageIO.write(ImageProcessing.resizeImageScalr(ImageProcessing.cropImageScalr(originalImage, width/2 - base/2, height/2 - base/2, base, base),100, 100),"png", new File(CommonPath.imagesPath() + "/speakers/"+fileName));
        return fileName;
    }

    @Override
    public void deleteImageSpeaker(String url) throws IOException {
        if (url != null) {
            String oldFileName = url.substring(url.lastIndexOf("/") + 1, url.length());
            Path oldPath = Paths.get(CommonPath.imagesPath() + "/speakers/" + oldFileName);
            if (Files.exists(oldPath)) {
                Files.delete(oldPath);
            }
        }
    }

    @Override
    public String uploadSponsorImageReturnImageName(MultipartFile file, Long sponsorId, PixelCrop pixelCrop) throws IOException {
        String imageName=sponsorId+".png";
        BufferedImage originalImage;
        if(file!=null && !file.isEmpty()){
            originalImage= ImageIO.read(file.getInputStream());
        }else{
            originalImage = ImageIO.read(new File(CommonPath.imagesPath() + "/sponsors/"+imageName));
        }
        BufferedImage bufferedImage;
        if(pixelCrop.getWidth()!=0 && pixelCrop.getHeight()!=0){
            bufferedImage = ImageProcessing.resizeImageScalr(originalImage.getSubimage(pixelCrop.getX(), pixelCrop.getY(),
                    pixelCrop.getWidth(), pixelCrop.getWidth()),ImageProcessing.AVATAR_WIDTH,ImageProcessing.AVATAR_HEIGHT);
        }else{
            float imageRatio = (float)originalImage.getWidth() / (float)originalImage.getHeight();
            float frameRatio = (float)ImageProcessing.AVATAR_WIDTH / (float)ImageProcessing.AVATAR_HEIGHT;
            BufferedImage background = new BufferedImage(ImageProcessing.AVATAR_WIDTH, ImageProcessing.AVATAR_HEIGHT, BufferedImage.TYPE_INT_RGB);
            background.getGraphics().setColor(Color.white);
            background.getGraphics().fillRect(0,0,ImageProcessing.AVATAR_WIDTH,ImageProcessing.AVATAR_HEIGHT);
            if(imageRatio>frameRatio){
                originalImage = ImageProcessing.resizeImageScalr(originalImage, ImageProcessing.AVATAR_WIDTH,(int)(ImageProcessing.AVATAR_WIDTH/imageRatio));
                background.getGraphics().drawImage(originalImage, 0, (int)(ImageProcessing.AVATAR_HEIGHT/2.0 - ImageProcessing.AVATAR_WIDTH/imageRatio/2.0) , null);
            }else{
                originalImage = ImageProcessing.resizeImageScalr(originalImage, (int)(ImageProcessing.AVATAR_HEIGHT*imageRatio),ImageProcessing.AVATAR_HEIGHT);
                background.getGraphics().drawImage(originalImage, (int)(ImageProcessing.AVATAR_WIDTH/2.0 - ImageProcessing.AVATAR_HEIGHT*imageRatio/2.0), 0, null);
            }
            bufferedImage = background;
        }
        ImageIO.write(bufferedImage,"png", new File(CommonPath.imagesPath() + "/sponsors/"+imageName));
        return imageName;
    }

    @Override
    public String uploadImageCreateUserProfileReturnImageName(MultipartFile file) throws IOException {
        String identify = Long.toString(new Date().getTime());
        String originalName = file.getOriginalFilename();
        String extension = originalName.substring(originalName.lastIndexOf(".")+1,originalName.length());
        String fileName = identify+"."+extension;
        BufferedImage originalImage= ImageIO.read(file.getInputStream());
        int width = originalImage.getWidth();
        int height = originalImage.getHeight();
        int base = width > height ? height : width;
        ImageIO.write(ImageProcessing.resizeImageScalr(ImageProcessing.cropImageScalr(originalImage, width/2 - base/2, height/2 - base/2, base, base),200, 200),"png", new File(CommonPath.imagesPath() + "/avatars/"+fileName));
        return fileName;
    }

    @Override
    public String uploadImageUpdateUserProfileReturnImageName(MultipartFile file, String url) throws IOException {
        this.deleteImageSpeaker(url);

        String identify = Long.toString(new Date().getTime());
        String originalName = file.getOriginalFilename();
        String extension = originalName.substring(originalName.lastIndexOf(".")+1,originalName.length());
        String fileName = identify+"."+extension;
        Path imagePath = Paths.get(CommonPath.imagesPath() + "/avatars/"+fileName);
        BufferedImage originalImage= ImageIO.read(file.getInputStream());
        int width = originalImage.getWidth();
        int height = originalImage.getHeight();
        int base = width > height ? height : width;
        ImageIO.write(ImageProcessing.resizeImageScalr(ImageProcessing.cropImageScalr(originalImage, width/2 - base/2, height/2 - base/2, base, base),200, 200),"png", new File(CommonPath.imagesPath() + "/avatars/"+fileName));
        return fileName;
    }

    @Override
    public void deleteImageUserProfile(String url) throws IOException {
        if (url != null) {
            String oldFileName = url.substring(url.lastIndexOf("/") + 1, url.length());
            Path oldPath = Paths.get(CommonPath.imagesPath() + "/avatars/" + oldFileName);
            if (Files.exists(oldPath)) {
                Files.delete(oldPath);
            }
        }
    }
}
