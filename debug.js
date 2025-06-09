// 简单的调试脚本来检查常见问题
const fs = require('fs');
const path = require('path');

console.log('🔍 开始诊断项目问题...\n');

// 检查关键文件是否存在
const criticalFiles = [
  'package.json',
  'next.config.mjs',
  'tailwind.config.ts',
  'app/layout.tsx',
  'app/page.tsx'
];

console.log('📁 检查关键文件:');
criticalFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file} - 存在`);
  } else {
    console.log(`❌ ${file} - 缺失`);
  }
});

// 检查环境变量文件
console.log('\n🔧 检查环境配置:');
if (fs.existsSync('.env')) {
  console.log('✅ .env 文件存在');
} else if (fs.existsSync('.env.example')) {
  console.log('⚠️  只有 .env.example，需要创建 .env 文件');
} else {
  console.log('❌ 没有找到环境配置文件');
}

// 检查node_modules
console.log('\n📦 检查依赖:');
if (fs.existsSync('node_modules')) {
  console.log('✅ node_modules 存在');
} else {
  console.log('❌ node_modules 不存在，需要运行 npm install');
}

console.log('\n🚀 诊断完成！');