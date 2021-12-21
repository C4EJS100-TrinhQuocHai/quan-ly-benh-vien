
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
   
function save () {
    let fullname= document.getElementById('fullname').value;
    let date= document.getElementById('date').value;
    let trieuchung= document.getElementById('trieuchung').value;
    let email= document.getElementById('email').value;
    let phone= document.getElementById('phone').value;
    let address= document.getElementById('address').value;
    let gender='';
    if (document.getElementById('male').checked) {
       gender=document.getElementById('male').value;
    }else if (document.getElementById('famale').checked) {
        gender=document.getElementById('famale').value;
    }
    
    if ( _.isEmpty(fullname)){
        fullname='';
        document.getElementById('fullname-error').innerHTML='vui lòng nhập họ và tên !';
    }else if(fullname.length<=2){
        fullname='';
        document.getElementById('fullname-error').innerHTML='vui lòng nhập trên 2 kí tự!';
    }
    else{
        document.getElementById('fullname-error').innerHTML='';
    }
    if (_.isEmpty(email)) {
        email='';
        document.getElementById('email-error').innerHTML=' vui lòng nhập email !';
    }else if(!validateEmail(email)){
        email='';
        document.getElementById('email-error').innerHTML=' email sai định dạng !';
    }else{
        document.getElementById('email-error').innerHTML='';
    }
    
    if (_.isEmpty(phone)) {
        phone='';
        document.getElementById('phone-error').innerHTML=' vui  lòng nhập số phone !';
    }else{
        document.getElementById('phone-error').innerHTML='';
    }
    if (_.isEmpty(address)) {
        address='';
        document.getElementById('address-error').innerHTML=' vui  lòng nhập địa chỉ !';
    }else{
        document.getElementById('address-error').innerHTML='';
    }
    if(_.isEmpty(gender)){
        gender='';
        document.getElementById('gender-error').innerHTML= 'vui lòng chọn giới tính !';
    }else{
        document.getElementById('gender-error').innerHTML='';
    }
    if (fullname  && phone && address && gender ) {
        
    let patients =localStorage.getItem('patients') ?  JSON.parse(localStorage.getItem('patients')) : [] ;
      
        patients.push({
            fullname: fullname,
            date :date,
            trieuchung: trieuchung,
            email: email,
            phone: phone,
            address:address,
            gender:gender,
        });
       localStorage.setItem('patients',JSON.stringify(patients));
       this.renderListPatient();
       
    }
    
}
function renderListPatient() {
   
    let patients =localStorage.getItem('patients') ?  JSON.parse(localStorage.getItem('patients')) : [] ;
    if(patients.length === 0) {
        document.getElementById('list-student').style.display='none';
        return false;
        
    }else{
        document.getElementById('list-student').style.display='block';
    }
    let tableContent =`
            <tr>
                <td>
                    #
                </td>
                <td>
                    Họ tên
                </td>
                <td>
                    Ngày Khám
                </td>
                <td>
                    Triệu Chứng
                </td>
                <td>
                        Email
                </td>
                <td>
                    điện thoại
                </td>
                <td>
                    Địa chỉ
                </td>
                <td> Hành động </td>
            </tr>
        `
        patients.forEach((patient,index) => {
            let patientId=index;
            index++;
            tableContent += ` <tr>
                <td>
                    ${index}
                </td>
                <td>
                    ${patient.fullname}
                </td>
                <td>
                    ${patient.date}
                </td>
                <td>
                    ${patient.trieuchung}
                </td>
                <td>
                    ${patient.email}
                </td>
                <td>
                    ${patient.phone}
                </td>
                <td>
                    ${patient.address}
                </td>
                <td> <a href="#" >  edit </a> | <a href="#" onclick='deletePatient(${patientId})'>  delete </a> </td>
        </tr>`
        });
        document.getElementById('grid-patients').innerHTML=tableContent;
}
function deletePatient(id){
    let patients =localStorage.getItem('patients') ?  JSON.parse(localStorage.getItem('patients')) : [] ;
    patients.splice(id,1);
     localStorage.setItem('patients',JSON.stringify(patients));
     renderListPatient();
     
}