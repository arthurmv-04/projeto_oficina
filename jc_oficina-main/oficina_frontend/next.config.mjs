export default {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/uploads/**', // Permite qualquer caminho em /uploads/
      },
    ],
  },
};
