import {combineForms} from 'react-redux-form';
const initialSignUpAccount = {
                        fullName: '',
                        email: '',
                        password: '',
                        rePassword: ''
                      };
const initialSpeaker = {
                        name: '',
                        major: '',
                        email: '',
                        linkedIn: '',
                        phone: '',
                        description: '',
                        avatar : null
                      };
const initialTopic = {
                        title: '',
                        description: '',
                        location: '',
                        starttime: '',
                        endtime: '',
                        startDate: '',
                        endDate : '',
                        speakers: {
                          value : []
                        }
                      };
const speakerListForm = [];

const profile = {
    id:"",
    fullName: "",
    job: "",
    birthday: "",
    email: "",
    phone: "",
    interest: "",
    address: "",
    avatarContent: null,
    optionalAllEmailReminder: true
};
const AppForm = combineForms({
    signUpAccount : initialSignUpAccount,
    speaker : initialSpeaker,
    topic : initialTopic,
    speakerListForm : speakerListForm,
    profile : profile,
  },"AppForm");

export default AppForm;
