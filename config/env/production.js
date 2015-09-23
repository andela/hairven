module.exports = {
  database: process.env.MONGOLAB_URI,

  secret: 'rosco',

  cloudinary: {
    cloud_name: 'hairven',
    api_key: '452146767177853',
    api_secret: 'jzOMpeohryKMimUbT6ptG_jcnq4',
    enhance_image_tag: true,
    static_image_support: false,
  }
};
