package vn.axonactive.internship_program.events_webservice.common;
/**
 * Created by lmchuc on 1/6/2017.
 */
public class Firebase {
   private int check;
   private int confirm;

    public Firebase() {
    }

    public Firebase(int check, int confirm) {
        this.check = check;
        this.confirm = confirm;
    }

    public int getCheck() {
        return check;
    }

    public void setCheck(int check) {
        this.check = check;
    }

    public int getConfirm() {
        return confirm;
    }

    public void setConfirm(int confirm) {
        this.confirm = confirm;
    }

}