// import axios from "axios";

// export const login = async (email, password) => {
//     try {
//         const result = await axios({
//             method: "POST",
//             url: `http://127.0.0.1:8080/api/users/login`,
//             data: {
//                 email,
//                 password,
//             },
//         });

//         if (res.data.status === "success") {
//             alert("Logged in successfully.");
//             window.setTimeout(() => {
//                 location.assign("/");
//             }, 1500);
//         }
//     } catch (err) {
//         alert(err.response.data.message);
//     }
// };

const loginUser = async () => 
{
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const data = { email: email, password: password };
    const response = await fetch("http://localhost:8080/api/users/login", {
      method: "POST", body: JSON.stringify(data), headers: { "Content-Type": "application/json"},
    });
    
    const json = await response.json();
     localStorage.setItem("token",json.token)
    localStorage.setItem("name",`${json.first_name} ${json.last_name}`);
    window.location.href ="index.html"; 
  };