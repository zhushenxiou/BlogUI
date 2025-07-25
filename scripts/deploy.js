import fs from 'fs';
import path from 'path';
import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

async function upload() {
  try {
    console.log('开始连接服务器...');

    // 读取私钥文件内容
    const privateKeyPath = path.join(process.env.HOME, '.ssh', 'MacbookAir.pem');
    const privateKey = fs.readFileSync(privateKeyPath, 'utf8');

    // 连接到云服务器
    await ssh.connect({
      host: '117.72.189.56',
      port: 22,
      username: 'root',
      privateKey, // 使用私钥内容连接
      password: 'Zhuliang0618@' // 若需要密码验证
    });

    console.log('连接成功，开始上传...');

    const localPath = './dist';
    const remotePath = '/www/wwwroot/117.72.189.56/dist';

    // 上传本地目录到远程服务器
    const success = await ssh.putDirectory(localPath, remotePath, {
      recursive: true,
      concurrency: 5,
      validate: () => true, // 默认全部文件上传，可加过滤逻辑
    });

    if (success) {
      console.log('上传成功');
    } else {
      console.warn('部分文件上传失败');
    }

    ssh.dispose();
  } catch (e) {
    console.error('上传失败:', e);
  }
}

upload();
