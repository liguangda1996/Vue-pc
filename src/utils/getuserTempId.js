// 生成未登录用户的唯一id
import { v4 as uuidv4 } from 'uuid';
/* 
    1.生成后的id要存储起来，
*/

function getUserTempId() {
    let userTempId = localStorage.getItem("userTempId");
    if (userTempId) {
        return userTempId;
    }
    userTempId = uuidv4();

    localStorage.setItem("userTempId", userTempId);

    return userTempId;
}

export default getUserTempId;
