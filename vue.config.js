module.exports = {
  transpileDependencies: true,
  // 关闭文件保存时启用 eslint 校验
  lintOnSave: false,
  chainWebpack: config => {
    config.resolve.extensions
        .add('ts')
        .add('tsx');
  }
}
