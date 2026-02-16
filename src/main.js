import './style.css'
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(
  'https://ujjwkhrkkjgoghrxzktx.supabase.co', 
  'sb_publishable_JppNdvfoHD6jNjHviNo82Q_AsFGeFtb'
);

document.querySelector('#app').innerHTML = `
    <div class="auth-card">
        <h2> 邮箱注册登录测试</h2>
        
        <div class="form-group">
            <label for="userEmail">邮箱</label>
            <input type="text" id="userEmail" autocomplete="off">
        </div>
        <div class="form-group">
            <label for="password">密码</label>
            <input type="password" id="password" placeholder="••••••••">
        </div>
        <div class="button-group">
            <button id="loginBtn">登录</button>
            <button id="registerBtn">注册</button>
        </div>
        <div class="forgot-password">
            <a href="#" id="forgotLink">忘记密码？</a>
        </div>
    </div>
`;

setTimeout(async () => {   // 如果需要，这里也可以加 async，但通常不需要
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const forgotLink = document.getElementById('forgotLink');

    function getFormData() {
        const userEmail = document.getElementById('userEmail').value;
        const password = document.getElementById('password').value;
        return { userEmail, password };
    }

    // 登录 —— 使用 async 回调
    loginBtn.addEventListener('click', async () => {
        const data = getFormData();
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
            email: data.userEmail,   // 假设输入的是邮箱
            password: data.password
        });
        console.log({ signInData, signInError });
        alert(signInError ? `登录失败: ${signInError.message}` : '登录成功');

        const appDiv = document.getElementById('app');
        appDiv.style.display = 'none';

        let successPanel = document.getElementById('successPanel');
        if (!successPanel) {
          successPanel = document.createElement('div');
          successPanel.id = 'successPanel';
          successPanel.className = 'success-panel';
          appDiv.parentNode.insertBefore(successPanel, appDiv.nextSibling);
        }

    successPanel.innerHTML = `
      <div style="background: white; padding: 40px; border-radius: 32px; max-width: 420px; margin: 0 auto; box-shadow: 0 25px 40px -12px rgba(0,20,40,0.15); text-align: center;">
        <h2 style="color: #0b2b3c; margin-bottom: 24px;"> 已登录</h2>
        <p style="font-size: 18px; margin-bottom: 32px; color: #1e4a5f;">
          当前用户：<strong>${data.userEmail}</strong>
        </p>
        <button id="logoutBtn" style="background: #1c5b73; color: white; border: none; padding: 12px 30px; border-radius: 60px; font-size: 16px; font-weight: 600; cursor: pointer;">
          退出登录
        </button>
      </div>
    `;

    document.getElementById('logoutBtn').addEventListener('click', async () => {
      const { error } = await supabase.auth.signOut();
      if (error) {
        alert('退出失败: ' + error.message);
        return;
      }
      // 隐藏欢迎面板，重新显示登录界面
      successPanel.style.display = 'none';
      appDiv.style.display = '';
      
      // 清空输入框
      document.getElementById('userEmail').value = '';
      document.getElementById('password').value = '';
      
      alert('已退出登录');
    });

    successPanel.style.display = 'block';

    });

    // 注册 —— 同样 async
    registerBtn.addEventListener('click', async () => {
        const data = getFormData();
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email: data.userEmail,
            password: data.password
        });
        console.log({ signUpData, signUpError });
        alert(signUpError ? `注册失败: ${signUpError.message}` : '注册申请成功，请查收验证确认邮件');
    });

    // 忘记密码
    forgotLink.addEventListener('click', async (e) => {
        e.preventDefault();
        
        // 获取当前邮箱输入框的值
        const email = document.getElementById('userEmail').value;
        if (!email) {
            alert('请在邮箱输入框中填写您的邮箱');
            return;
        }

        // 重定向页面的完整 URL
        const redirectTo = window.location.origin + '/reset-password.html';

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: redirectTo,
        });

        if (error) {
            alert('发送重置邮件失败: ' + error.message);
        } else {
            alert('重置密码邮件已发送，请查收并点击链接继续');
        }
    });
}, 0);




