let form = document.querySelector("form");
let main = document.querySelector(".main");
let call = document.querySelector("#call")
form.addEventListener("submit",(event)=>{
    let name=event.target.uname.value;
    let email=event.target.email.value; 
    let phone=event.target.phone.value;
    var check = 0;


    var userData = JSON.parse(localStorage.getItem("userDetails")) ?? [];


    for(let v of userData){
        if(v.email==email || v.phone==phone){
            check = 1;
            break;
        }
    }
    if(check==1){
        alert("E-mail or phone already Exist!")
    }
    else{
        userData.push({
            'name': name,
            'email': email,
            'phone': phone
        })
        localStorage.setItem("userDetails", JSON.stringify(userData));
        event.target.reset();
    }
    
    displayData();
    // console.log(userData);
    event.preventDefault();
})


let displayData = () =>{
    var userData = JSON.parse(localStorage.getItem("userDetails")) ?? [];
    let finalData = ' ';
    userData.forEach((element, i) => {
        finalData+=`<div class="items">
        <span onclick='removeData(${i})'>&times;</span>
        <h5>Name</h5>
        <div>${element.name}</div>

        <h5>Email</h5>
        <div>${element.email}</div>

        <h5>Phone number</h5>
        <div>${element.phone}</div>
    </div>`
    });
    main.innerHTML=finalData;
}
let removeData =(index)=>{
    var userData = JSON.parse(localStorage.getItem("userDetails")) ?? [];
    userData.splice(index,1);
    localStorage.setItem("userDetails", JSON.stringify(userData));


    displayData();
}
call.addEventListener("click",()=>{
    localStorage.clear("userDetails");
    displayData();
})
displayData();